using consultorFinanceiro_webapi.Application.Common;
using consultorFinanceiro_webapi.Application.Dtos.Category;

namespace consultorFinanceiro_webapi.Application.Interfaces
{
    public interface ICategoryService
    {
        public Task<Result<List<ReturnCategory>>> GetAllAsync(Guid userId);
        public Task<Result<List<MinimalCategory>>> GetAllMinimalAsync(Guid userId);
        public Task<Result<ReturnCategory>> GetByIdAsync(Guid categoryId, Guid userId);
        public Task<Result<ReturnCategory>> CreateCategoryAsync(CategoryDto create, Guid userId);
        public Task<Result<ReturnCategory>> UpdateCategoryAsync(Guid id, CategoryDto update, Guid userId);
        public Task<Result<bool>> DeleteCategoryAsync(Guid categoryId, Guid userId);
    }
}
