using consultorFinanceiro_webapi.Application.Common;
using consultorFinanceiro_webapi.Application.Dtos.Users;

namespace consultorFinanceiro_webapi.Application.Interfaces
{
    public interface IAuthService
    {
        Task<(bool Sucess, object? Errors)> RegisterAsync(RegisterUser register);
        Task<Result<string?>> LoginAsync(LoginUser login);
        Task<Result<ReturnUser>> GetUserAsync(string username);
        //Task<ReturnUser> ChangeNameAsync(UpdateName name, Guid userId);
        //Task<ReturnUser> ChangeEmailAsync(UpdateEmail email, Guid userId);
        //Task<ReturnUser> ChangeUsernameAsync(UpdateUsername username, Guid userId);
        //Task<ReturnUser> ChangePasswordAsync(UpdatePassword password, Guid userId);
        Task<Result<bool>> DeleteUserAsync(Guid userId);
    }
}
