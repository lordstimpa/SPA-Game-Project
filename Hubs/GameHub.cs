using Microsoft.AspNetCore.SignalR;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using SPAGame.Data;
using System.Text.RegularExpressions;

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

            string guessFixed = Regex.Replace(guess, @"\s", "").ToLower();
            string answerFixed = Regex.Replace(game.Answer, @"\s", "").ToLower();

            if (answerFixed == guessFixed)
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

            if (game.HiddenAnswer == game.Answer || answerFixed == guessFixed)
            {
                PostScore(game.PublicId);
            }
        }

        public async Task PostScore(string publicId)
        {
            var game = _context.Game.FirstOrDefault(x => x.PublicId == publicId);
            bool gameResult = false;

            if (game == null)
            {
                throw new Exception("Game ID is wrong or null.");
            }

            if (game.Guesses >= 10)         
            {
                game.Score = 0;
                _context.SaveChanges();
            } 
            else
            {
                gameResult = true;
                game.Score -= game.Guesses * 10;
                _context.SaveChanges();
            }

            await Clients.Group(game.PublicId).SendAsync("ShowGameResults", game.Score, gameResult);
        }
    }
}
