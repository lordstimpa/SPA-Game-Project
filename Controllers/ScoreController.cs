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
        private readonly ILogger<ScoreController> _logger;

        public ScoreController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, ILogger<ScoreController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
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
        public async Task<IActionResult> PostUserScore([FromBody] GameModel model)
        {
            try
            {
                _logger.LogInformation($"Received score: {model.Score}");
                var userId = _userManager.GetUserId(User);

                var gameModel = new GameModel
                {
                    Score = model.Score,
                    UserId = userId
                };

                _context.Game.Add(gameModel);
                await _context.SaveChangesAsync();
                return Ok("Successfully added score");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                var errorObject = new { message = $"Internal server error: {ex.Message}" };
                return StatusCode(500, errorObject);
            }
        }
    }
}
