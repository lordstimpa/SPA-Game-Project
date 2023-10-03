using Microsoft.EntityFrameworkCore;
using SPAG.Models.ViewModels;
using SPAG.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace SPAG.Data
{
    public class DataContext : IdentityDbContext<UserModel, IdentityRole<int>, int>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<GameModel> Game { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserModel>().HasData(new UserModel[] {
                new UserModel
                { 
                    Id = 1,
                    UserName = "Mike123",
                    GamerTag = "adfsfg",
                    NormalizedUserName = "MIKE123",
                    Email = "mike@example.com",
                    NormalizedEmail = "MIKE@EXAMPLE.COM",
                    EmailConfirmed = true,
                    PasswordHash = new PasswordHasher<UserModel>().HashPassword(null, "12345")
                },
                new UserModel
                {
                    Id = 2,
                    GamerTag = "fitthor",
                    UserName = "David123",
                    NormalizedUserName = "DAVID123",
                    Email = "david@example.com",
                    NormalizedEmail = "DAVID@EXAMPLE.COM",
                    EmailConfirmed = true,
                    PasswordHash = new PasswordHasher<UserModel>().HashPassword(null, "12345")
                },
                new UserModel
                {
                    Id = 3,
                    GamerTag = "fitthrdgtjhahdfgor",
                    UserName = "Anders123",
                    NormalizedUserName = "ANDERS123",
                    Email = "anders@example.com",
                    NormalizedEmail = "ANDERS@EXAMPLE.COM",
                    EmailConfirmed = true,
                    PasswordHash = new PasswordHasher<UserModel>().HashPassword(null, "12345")
                }
            });

            modelBuilder.Entity<GameModel>().HasData(new GameModel[] {
                new GameModel { Id=1, Score=111, UserId=1},
                new GameModel { Id=2, Score=250, UserId=2},
                new GameModel { Id=3, Score=2500, UserId=3},
            });
        }
    }
}
