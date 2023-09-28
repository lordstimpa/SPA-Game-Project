using Microsoft.EntityFrameworkCore;
using SPAG.Models.ViewModels;
using SPAG.Models;

namespace SPAG.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<UserModel> User { get; set; }
        public DbSet<GameModel> Game { get; set; }


        //Use once to genreate data in DB for easy use
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().HasData(new UserModel[] {
                new UserModel{ Id=1, GamerTag="KillerMike", UserName="Mike123", Password="12345",Description="Hej hallå"},
                new UserModel{ Id=2, GamerTag="RobustRobert", UserName="Robban123", Password="12345",Description=null},
                new UserModel{ Id=3, GamerTag="EliteIlyas", UserName="Ilyas" , Password="12345", Description="Im best"}

            });
            modelBuilder.Entity<GameModel>().HasData(new GameModel[] {
                new GameModel { Id=1, Score=111, FkUser=1},
                new GameModel { Id=2, Score=250, FkUser=2},
                new GameModel { Id=3, Score=2500, FkUser=3},
            });

        }
    }
}
