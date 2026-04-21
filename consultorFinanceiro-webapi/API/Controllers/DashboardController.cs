using consultorFinanceiro_webapi.Application.Interfaces;
using consultorFinanceiro_webapi.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace consultorFinanceiro_webapi.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _service;

        public DashboardController(IDashboardService service)
        {
            _service = service;
        }
        [Authorize]
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAllFinances()
        {
            return Ok(await _service.GetUsersFinanceSummaryAsync());
        }
    }
}
