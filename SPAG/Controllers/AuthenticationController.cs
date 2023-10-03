using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SPAG.Data;
using SPAG.Models;
using SPAG.Models.ViewModels;
using System.Security.Claims;

namespace SPAG.Controllers
{
    /*
    [ApiController, Route("[controller]"), Authorize]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<UserModel> _userManager;

        public AuthenticationController(UserManager<UserModel> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("status")]
        public IActionResult Status()
        {
            var isAuthenticated = User.Identity.IsAuthenticated;

            var user = _userManager.GetUserAsync(User).Result;

            if (isAuthenticated)
            {
                return Ok(new
                {
                    isAuthenticated,
                    user.GamerTag,
                    user.Description
                });
            } else
            {
                return Unauthorized(new 
                {
                    isAuthenticated = false
                });
            }
        }
    }
    */
}
