using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace SPAG.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        [Required,MinLength(2),StringLength(25)]
        public string UserName { get; set; }
        [Required, MinLength(8), StringLength(25)]
        public string Password { get; set; }
        [Required, MinLength(3) ,StringLength(25)]
        public string GamerTag { get; set; }
        [AllowNull,DataType(DataType.MultilineText),MaxLength(250)]
        public string? Description { get; set; }
    }
}
