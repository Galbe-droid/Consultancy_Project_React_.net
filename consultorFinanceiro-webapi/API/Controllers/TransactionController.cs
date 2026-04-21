using consultorFinanceiro_webapi.Application.Dtos.Transaction;
using consultorFinanceiro_webapi.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace consultorFinanceiro_webapi.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [Authorize]
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _transactionService.GetAllAsync(Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
        [Authorize]
        [HttpGet]
        [Route("minimal")]
        public async Task<IActionResult> GetAllMinimal()
        {
            return Ok(await _transactionService.GetAllMinimalAsync(Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
        [Authorize]
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(await _transactionService.GetByIdAsync(id, Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
        [Authorize]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateTransaction([FromBody]TransactionDto create)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);   

            return Ok(await _transactionService.CreateTransactionAsync(create, userId));
        }
        [Authorize]
        [HttpPut]
        [Route("update/{id:guid}")]
        public async Task<IActionResult> UpdateTransaction(Guid id, [FromBody]TransactionDto update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            return Ok(await _transactionService.UpdateTransactionAsync(id, update, userId));
        }
        [Authorize]
        [HttpDelete]
        [Route("delete/{id:guid}")]
        public async Task<IActionResult> DeleteTransaction(Guid id)
        {
            return Ok(await _transactionService.DeleteTransactionAsync(id, Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
    }
}
