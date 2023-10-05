using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;
using SPAGame.Models.ViewModels;

namespace SPAGame.Controllers
{
    [ApiController, Route("[controller]")]
    public class ScoreController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScoreController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("gettoptenoverall")]
        public List<GameViewModel> GetTopTenOverallScore()
        {
            var games = _context.Game
            .Select(game => new GameViewModel
            {
                Score = game.Score,
                UserId = game.UserId,
            })
            .OrderByDescending(game => game.Score)
            .Take(10)
            .ToList();

            return games;
        }

        [HttpGet("gettoptenuser/{userId}")]
        public List<GameViewModel> GetTopTenUserScore(string userId)
        {
            var games = _context.Game
                .Where(game => game.UserId == userId)
                .OrderByDescending(game => game.Score)
                .Select(game => new GameViewModel
                {
                    Score = game.Score,
                    UserId = game.UserId,
                })
                .Take(10)
                .ToList();

            return games;
        }
    }
}
