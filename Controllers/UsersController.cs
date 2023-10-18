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
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<UserController> _logger;

        public UserController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, ILogger<UserController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet("getuser")]
        [Authorize]
        public UserViewModel GetUserInfo()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = _userManager.Users.FirstOrDefault(x => x.Id == userId);
                if (userId == null)
                {
                    throw new Exception("No user");
                }
                var userInfo = new UserViewModel()
                {
                    UserName = user.UserName,
                    Description = user.Description,
                    GamerTag = user.GamerTag,
                    //Score = user.Score,
                };
                return userInfo;
            }
            catch (Exception ex)
            { 

                throw new Exception("Error" , ex);
            }
        }
    }
}