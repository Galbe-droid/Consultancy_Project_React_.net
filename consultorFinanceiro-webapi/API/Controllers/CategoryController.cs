using consultorFinanceiro_webapi.Application.Dtos.Category;
using consultorFinanceiro_webapi.Application.Interfaces;
using consultorFinanceiro_webapi.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace consultorFinanceiro_webapi.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [Authorize]
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _categoryService.GetAllAsync(Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
        [Authorize]
        [HttpGet]
        [Route("minimal")]
        public async Task<IActionResult> GetAllMinimal()
        {
            return Ok(await _categoryService.GetAllMinimalAsync(Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
        [Authorize]
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _categoryService.GetByIdAsync(id, Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
        [Authorize]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateCategory([FromBody]CategoryDto create)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(await _categoryService.CreateCategoryAsync(create, Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
        [Authorize]
        [HttpPut]
        [Route("update/{id:guid}")]
        public async Task<IActionResult> UpdateCategory(Guid id, [FromBody]CategoryDto update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(await _categoryService.UpdateCategoryAsync(id, update, Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
        [Authorize]
        [HttpDelete]
        [Route("delete/{id:guid}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            return Ok(await _categoryService.DeleteCategoryAsync(id, Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)));
        }
    }
}
