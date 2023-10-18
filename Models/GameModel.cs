using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPAGame.Models
{
    public class GameModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? PublicId { get; set; }

        [ForeignKey("User")]
        public string? UserId { get; set; }
        public virtual ApplicationUser? User { get; set; }

        [Required]
        public string? Answer { get; set; }

        [Required]
        public string? HiddenAnswer { get; set; }

        [Required]
        public int Score { get; set; } = 100;
    }
}
