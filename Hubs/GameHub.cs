using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SPAGame.Data;

namespace SPAGame.Hubs
{
    public class GameHub : Hub
    {
        private readonly ApplicationDbContext _context;

        public GameHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddToGroup(string gameId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
        }

        public async Task MakeGuess(string gameId, string guess)
        {
            var game = _context.Game.FirstOrDefault(x => x.PublicId == gameId);

            if (game == null)
            {
                throw new Exception("Game ID is wrong or null.");
            }

            string guessFixed = guess.ToLower().Trim();

            if (game.Answer.ToLower() == guessFixed)
            {
                // Handle case when user guesses entire word correctly
                game.HiddenAnswer = game.Answer;
            }
            else if (guess.Length == 1 && game.Answer.ToLower().Contains(guessFixed))
            {
                // Handle case when user guesses on a single letter 
                char letterToGuess = guess[0];
                char[] answerCharArray = game.Answer.ToLower().ToCharArray();
                char[] hiddenAnswerCharArray = game.HiddenAnswer.ToCharArray();

                for (int i = 0; i < answerCharArray.Length; i++)
                {
                    if (answerCharArray[i] == letterToGuess)
                    {
                        hiddenAnswerCharArray[i] = game.Answer[i];
                    }
                }

                game.HiddenAnswer = new string(hiddenAnswerCharArray);
            }
            else
            {
                // Handle case when user guesses wrong
                game.Guesses += 1;
            }

            _context.SaveChanges();
            await Clients.Group(gameId).SendAsync("UpdateHiddenAnswer", game.HiddenAnswer, game.Guesses);

            if (game.Answer == game.HiddenAnswer)
            {
                PostScore(game.UserId);
            }
        }

        public async Task PostScore(string userId)
        {
            var game = _context.Game.FirstOrDefault(x => x.UserId == userId);
            bool gameResult = false;

            if (game == null)
            {
                throw new Exception("Game ID is wrong or null.");
            }

            game.Score -= game.Guesses * 10;

            if (game.Score > 0)         
            {
                gameResult = true;
            } 
            else
            {
                game.Score = 0;
            }

            _context.SaveChanges();
            await Clients.Group(game.PublicId).SendAsync("ShowGameResults", game.Score, gameResult);
        }
    }
}
