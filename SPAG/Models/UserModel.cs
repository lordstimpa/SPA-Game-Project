using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace SPAG.Models
{
    public class UserModel : IdentityUser<int>
    {
        [Required, MinLength(3), MaxLength(25)]
        public string GamerTag { get; set; }

        [AllowNull, DataType(DataType.MultilineText), MaxLength(250)]
        public string? Description { get; set; }
    }
}
