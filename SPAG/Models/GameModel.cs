using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPAG.Models
{
    public class GameViewModel
    {
        [Key]
        public int Id { get; set; }
        public int Score { get; set; }
        [ForeignKey("User")]
        public int FkUser { get; set; }
        public virtual UserModel User { get; set; }
    }
}
