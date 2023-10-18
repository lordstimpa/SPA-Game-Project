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
                game.HiddenAnswer = game.Answer;
                _context.SaveChanges();

                await Clients.Group(gameId).SendAsync("UpdateHiddenAnswer", game.HiddenAnswer);
            }
            else if (guess.Length == 1 && game.Answer.ToLower().Contains(guessFixed))
            {
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
                _context.SaveChanges();

                await Clients.Group(gameId).SendAsync("UpdateHiddenAnswer", game.HiddenAnswer);
            }
        }

        public async Task PostScore(string userId, int score)
        {
            var game = _context.Game.FirstOrDefault(x => x.UserId == userId);

            if (game == null)
            {
                throw new Exception("Game ID is wrong or null.");
            }


        }
    }
}
