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
        public List<ScoreViewModel> GetTopTenOverallScore()
        {
            var games = _context.Game
                .Join(_context.Users,
                    game => game.UserId,
                    user => user.Id,
                    (game, user) => new ScoreViewModel
                    {
                        GamerTag = user.GamerTag,
                        Score = game.Score
                    })
                .OrderByDescending(game => game.Score)
                .Take(10)
                .ToList();

            return games;
        }

        [HttpGet("gettoptenuser/{userId}")]
        public List<ScoreViewModel> GetTopTenUserScore(string userId)
        {
            var games = _context.Game
                .Where(game => game.UserId == userId)
                .OrderByDescending(game => game.Score)
                .Select(game => new ScoreViewModel
                {
                    Score = game.Score,
                })
                .Take(10)
                .ToList();

            return games;
        }

        /*
        [HttpPost("postuserscore")]
        [Authorize]
        public async Task<IActionResult> CreateGame([FromBody] ScoreViewModel model)
        {
            try
            {
                if (model == null || model.Game <= 0)
                {
                    return BadRequest("Invalid score data.");
                }

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId == null)
                {
                    return BadRequest("User not found.");
                }

                var game = new ScoreModel
                {
                    Score = model.Score,
                    UserId = userId,
                };

                _context.Score.Add(game);

                await _context.SaveChangesAsync();

                return Ok("Score posted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the request.");

                return StatusCode(500, "Internal Server Error");
            }
        }
        */
    }
}
