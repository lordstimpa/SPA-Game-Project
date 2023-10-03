using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SPAG.Models
{
    public class GameModel
    {
        [Key]
        public int Id { get; set; }
        public int Score { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual UserModel? User { get; set; }
    }
}
