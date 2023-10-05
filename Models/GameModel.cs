using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPAGame.Models
{
    public class GameModel
    {
        [Key]
        public int Id { get; set; }
        public int Score { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual ApplicationUser? User { get; set; }
    }
}
