using consultorFinanceiro_webapi.Application.Dtos.Users;
using consultorFinanceiro_webapi.Domain.Entities;

namespace consultorFinanceiro_webapi.API.Mapping
{
    public class UserMapping
    {
        public static ReturnUser ToReturnUser(User user)
        {
            return new ReturnUser
            {
                Email = user.Email,
                Username = user.Username,
                Name = user.Name,
                SurName = user.SurName,
            };
        }
        
        public static User ToUser(RegisterUser register)
        {
            return new User
            {
                Username = register.Username,
                Email = register.Email,
                Name = register.Name,
                SurName = register.SurName,
            };
        }
    }
}
