using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string? ConfirmationCode { get; set; }
        public DateTime? ConfirmationCodeExpiration { get; set; }

    }
}
