using System.ComponentModel.DataAnnotations;

namespace consultorFinanceiro_webapi.Application.Dtos.Users
{
    public class LoginUser
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
