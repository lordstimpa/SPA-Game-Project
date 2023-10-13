using System.ComponentModel.DataAnnotations;

namespace SPAGame.Models
{
    public class GameModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? PublicId { get; set; }

        [Required]
        public string? Answer { get; set; }
    }
}
