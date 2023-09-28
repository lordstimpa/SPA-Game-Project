using Microsoft.AspNetCore.Mvc;
using SPAG.Data;
using SPAG.Models.ViewModels;

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

        [HttpGet("gettoptenoverall")]
        public List<GameViewModel> GetTopTenOverallScore()
        {
            var games = _context.Game
            .Select(game => new GameViewModel
            {
                Score = game.Score,
                FkUser = game.FkUser,
            })
            .OrderByDescending(game => game.Score)
            .Take(10)
            .ToList();

            return games;
        }

        [HttpGet("gettoptenuser/{userId}")]
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
