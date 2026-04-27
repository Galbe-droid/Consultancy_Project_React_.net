using consultorFinanceiro_webapi.Application.Dtos.Users;
using consultorFinanceiro_webapi.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace consultorFinanceiro_webapi.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableRateLimiting("fixed")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginUser login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var token = await _authService.LoginAsync(login);

            Console.WriteLine(token);

            if (token.Data == null)
            {
                return Unauthorized();
            }

            var userInfo = await _authService.GetUserAsync(login.Login);

            return Ok(new { token.Data, userInfo.Data });
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterUser register)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _authService.RegisterAsync(register);

            if (!result.Sucess)
            {
                return BadRequest(new { errors = result.Errors });
            }

            return Ok();
        }
        [Authorize]
        [HttpDelete]
        [Route("delete/{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _authService.DeleteUserAsync(id);

            if (!result.Data)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
