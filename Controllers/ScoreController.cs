using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;
using SPAGame.Models.ViewModels;
using System.Security.Claims;

namespace SPAGame.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        [Authorize]
        public async Task<IActionResult> CreateGame([FromBody] ScoreViewModel model)
        {
            try
            {
                if (model == null || model.Score <= 0)
                {
                    return BadRequest("Invalid score data.");
                }

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId == null)
                {
                    return BadRequest("User not found.");
                }

                var game = new GameModel
                {
                    Score = model.Score,
                    UserId = userId,
                };

                _context.Game.Add(game);
                await _context.SaveChangesAsync();

                return Ok("Game created successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the request.");

                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
