using consultorFinanceiro_webapi.API.Mapping;
using consultorFinanceiro_webapi.Application.Common;
using consultorFinanceiro_webapi.Application.Dtos.Users;
using consultorFinanceiro_webapi.Application.Interfaces;
using consultorFinanceiro_webapi.Domain.Entities;
using consultorFinanceiro_webapi.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace consultorFinanceiro_webapi.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly JwtService _jwt;
        private readonly PasswordHasher<User> _hasher;
        private readonly ConsultancyDBContext _dBContext;
        public AuthService(ConsultancyDBContext dBContext, JwtService jwt)
        {
            _jwt = jwt;
            _hasher = new PasswordHasher<User>();
            _dBContext = dBContext;
        }
        public async Task<Result<bool>> DeleteUserAsync(Guid userId)
        {
            _dBContext.CurrentUserId = userId;
            var user = await _dBContext.Users.FindAsync(userId);

            if (user == null)
            {
                return Result<bool>.Fail("Usuario não encontrado");
            }

            await _dBContext.Transactions.Where(t => t.UserId == userId)
                                         .ExecuteUpdateAsync(setter => setter.SetProperty(x => x.IsDeleted, true));
            await _dBContext.Categories.Where(c => c.UserId == userId)
                                         .ExecuteUpdateAsync(setter => setter.SetProperty(x => x.IsDeleted, true));

            user.IsDeleted = true;

            await _dBContext.SaveChangesAsync();

            return Result<bool>.Ok(true);
        }

        public async Task<Result<ReturnUser>> GetUserAsync(string username)
        {
            var user = await _dBContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return Result<ReturnUser>.Fail("Usuario não encontrado");
            }
            
            return Result<ReturnUser>.Ok(UserMapping.ToReturnUser(user));
        }

        public async Task<Result<string?>> LoginAsync(LoginUser login)
        {
            var user = await _dBContext.Users.FirstOrDefaultAsync(u => u.Username == login.Login);

            if (login.Login.Contains('@') && user == null)
            {
                user = await _dBContext.Users.FirstOrDefaultAsync(u => u.Email == login.Login);
            }

            if (user == null)
            {
                return Result<string?>.Fail("Usuario não encontrado");
            }

            var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, login.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                return Result<string?>.Fail("Senha Incorreta");
            }

            user.LastLogin = DateTime.UtcNow;
            
            await _dBContext.SaveChangesAsync();

            var token = _jwt.GenerateToken(user);

            Console.WriteLine("Passei aqui");

            return Result<string?>.Ok(_jwt.GenerateToken(user));
        }

        public async Task<(bool Sucess, object? Errors)> RegisterAsync(RegisterUser register)
        {
            var errors = new Dictionary<string, string>();

            if (await _dBContext.Users.AnyAsync(x => x.Username == register.Username))
                errors["username"] = "Username ja existe";

            if (await _dBContext.Users.AnyAsync(x => x.Email == register.Email))
                errors["email"] = "Email ja existe";

            if (errors.Any())
                return (false, errors);

            var user = UserMapping.ToUser(register);

            user.PasswordHash = _hasher.HashPassword(user, register.Password);

            await _dBContext.Users.AddAsync(user);

            await _dBContext.SaveChangesAsync();

            return (true, null);
        }
    }
}
