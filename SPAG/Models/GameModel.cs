using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPAG.Models
{
    public class GameModel
    {
        [Key]
        public int Id { get; set; }
        public int Score { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual UserModel? User { get; set; }
    }
}
