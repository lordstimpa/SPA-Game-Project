using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SPAG.Models.ViewModels
{
    public class GameViewModel
    {
        public int Score { get; set; }
        public int FkUser { get; set; }
    }
}
