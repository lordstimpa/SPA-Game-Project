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
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("getuser")]
        public UserViewModel GetUserInfo()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = _userManager.Users.FirstOrDefault(x => x.Id == userId);

                var games = _context.Game.Where(game => game.UserId == userId).ToList();
                int totalScore = 0;

                foreach (var game in games)
                {
                    totalScore += game.Score;
                }

                if (userId == null)
                {
                    throw new Exception("Error fetching User");
                }

                var userInfo = new UserViewModel()
                {
                    UserName = user.UserName,
                    Description = user.Description,
                    GamerTag = user.GamerTag,
                    Score = totalScore,
                    GamesPlayed = games.Count(),
                };
                return userInfo;
            }
            catch (Exception ex)
            { 

                throw new Exception("Error" , ex);
            }
        }

        [HttpGet("userloggedin")]
        public bool CheckLoggedIn()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}