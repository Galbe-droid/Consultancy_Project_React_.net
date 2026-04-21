using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace consultorFinanceiro_webapi.Application.Dtos.Users
{
    public class RegisterUser
    {
        [Required]
        [RegularExpression("^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers and underscore.")]
        [MinLength(5, ErrorMessage = "Username has to be minimum of five characters")]
        [MaxLength(18, ErrorMessage = "Username has to be maximum of eighteen characters")]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [PasswordPropertyText]
        [MinLength(6, ErrorMessage = "Password has to be minimum of six characters")]
        public string Password { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers and underscore.")]
        [MinLength(5, ErrorMessage = "Name has to be minimum of five characters")]
        [MaxLength(18, ErrorMessage = "Name has to be maximum of eighteen characters")]
        public string Name { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers and underscore.")]
        [MinLength(5, ErrorMessage = "SurName has to be minimum of five characters")]
        [MaxLength(18, ErrorMessage = "SurName has to be maximum of eighteen characters")]
        public string SurName { get; set; }
    }
}
