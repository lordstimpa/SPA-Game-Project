using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;
using SPAGame.Models.ViewModels;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace SPAGame.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScoreController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ScoreController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("gettoptenoverall")]
        public List<ScoreViewModel> GetTopTenOverallScore()
        {
            var topTenOverallScores = _context.Game
                .GroupBy(game => game.UserId)
                .Select(group => new ScoreViewModel
                {
                    GamerTag = group.First().User.GamerTag,
                    Score = group.Sum(game => game.Score)
                })
                .OrderByDescending(score => score.Score)
                .Take(10)
                .ToList();

            return topTenOverallScores;
        }
    }
}
