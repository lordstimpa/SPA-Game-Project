using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<ApplicationUser> _userManager;

        public ScoreController(ApplicationDbContext context)
        {
            _context = context;
        }

        public ScoreController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("gettoptenoverall")]
        public List<GameViewModel> GetTopTenOverallScore()
        {
            var games = _context.Game
            .Select(game => new GameViewModel
            {
                Score = game.Score,
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
                })
                .Take(10)
                .ToList();

            return games;
        }

        [HttpPost("postuserscore")]
        public async Task<IActionResult> PostUserScore([FromBody] GameModel gameModel)
        {
            if (gameModel == null)
            {
                return BadRequest("Invalid data");
            }

            try
            {
                var userId = _userManager.GetUserId(User);
                gameModel.UserId = userId;

                Console.WriteLine("Userid imported value: " + userId);
                Console.WriteLine("\rUserid set value: " + gameModel.UserId);

                _context.Game.Add(gameModel);
                await _context.SaveChangesAsync();
                return Ok("Successfully added score");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
