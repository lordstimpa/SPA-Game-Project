using SPAG.Models;

namespace SPAG.Data
{
    public class DataHelper
    {
        private readonly DataContext _context;

        public DataHelper(DataContext context)
        {
            _context = context;
        }

        public List<GameViewModel> GetTopTenOverallGames()
        {
            var games = _context.Game
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

        public List<GameViewModel> GetTopTenUserGames(int userId)
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
