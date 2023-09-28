using Microsoft.AspNetCore.Mvc;
using SPAG.Data;
using SPAG.Models;

namespace SPAG.Controllers
{
    [ApiController, Route("[controller]")]
    public class ScoreController : ControllerBase
    {
        private readonly DataContext _context;

        public ScoreController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("toptenoverall")]
        public List<GameViewModel> GetTopTenOverallScore()
        {
            var games = _context.Game
            .OrderByDescending(game => game.Score)
            .Select(game => new GameViewModel
            {
                Score = game.Score,
                FkUser = game.FkUser,
            })
            .Take(10)
            .ToList();

            return games;
        }

        [HttpGet("toptenuser/{userId}")]
        public List<GameViewModel> GetTopTenUserScore(int userId)
        {
            var games = _context.Game
                .Where(game => game.FkUser == userId)
                .OrderByDescending(game => game.Score)
                .Select(game => new GameViewModel
                {
                    Score = game.Score,
                    FkUser = game.FkUser,
                })
                .Take(10)
                .ToList();

            return games;
        }
    }
}
