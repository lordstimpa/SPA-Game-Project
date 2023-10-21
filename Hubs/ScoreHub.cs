using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SPAGame.Controllers;
using SPAGame.Data;
using SPAGame.Models;
using SPAGame.Models.ViewModels;

namespace SPAGame.Hubs
{
    public class ScoreHub : Hub
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ScoreController _scoreController;

        public ScoreHub(UserManager<ApplicationUser> userManager, ScoreController scoreController)
        {
            _userManager = userManager;
            _scoreController = scoreController;
        }

        public async Task CheckPlacement()
        {
            var user = await _userManager.GetUserAsync(Context.User);
            var topTenScores = _scoreController.GetTopTenOverallScore();
            var userPlacement = topTenScores.FindIndex(score => score.GamerTag == user.GamerTag);

            await Clients.Caller.SendAsync("NotifyPlacementChange", userPlacement, user.GamerTag);
            await Groups.AddToGroupAsync(Context.ConnectionId, user.Id);
        }
    }
}
