using consultorFinanceiro_webapi.API.Mapping;
using consultorFinanceiro_webapi.Application.Common;
using consultorFinanceiro_webapi.Application.Dtos.Category;
using consultorFinanceiro_webapi.Application.Interfaces;
using consultorFinanceiro_webapi.Domain.Entities;
using consultorFinanceiro_webapi.Domain.Enum;
using consultorFinanceiro_webapi.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace consultorFinanceiro_webapi.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ConsultancyDBContext _dBContext;

        public CategoryService(ConsultancyDBContext dbContext)
        {
            _dBContext = dbContext;
        }

        public async Task<Result<ReturnCategory>> CreateCategoryAsync(CategoryDto create, Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            Category category = CategoryMapping.ToCategory(create, userId);

            await _dBContext.Categories.AddAsync(category);
            await _dBContext.SaveChangesAsync();

            return Result<ReturnCategory>.Ok(CategoryMapping.ToReturnCategory(category));
        }

        public async Task<Result<bool>> DeleteCategoryAsync(Guid categoryId, Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var category = _dBContext.Categories.FirstOrDefault(c => c.Id == categoryId);

            if(category == null)
            {
                return Result<bool>.Fail("Categoria não encontrada");
            }

            await _dBContext.Transactions.Where(t => t.CategoryId == category.Id)
                                         .ExecuteUpdateAsync(setter => setter.SetProperty(x => x.CategoryId, (Guid?)null));

            category.IsDeleted = true;
            await _dBContext.SaveChangesAsync();

            return Result<bool>.Ok(true);
        }

        public async Task<Result<List<ReturnCategory>>> GetAllAsync(Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var categoryList = await _dBContext.Categories.AsNoTracking().ToListAsync();

            return Result<List<ReturnCategory>>.Ok(CategoryMapping.ToListReturnCategory(categoryList));
        }

        public async Task<Result<List<MinimalCategory>>> GetAllMinimalAsync(Guid userId)
        {
            _dBContext.CurrentUserId = userId;
            var categoryList = await _dBContext.Categories.AsNoTracking().ToListAsync();
            return Result<List<MinimalCategory>>.Ok(CategoryMapping.ToListMinimalCategory(categoryList));
        }
        public async Task<Result<ReturnCategory>> GetByIdAsync(Guid categoryId, Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var category = await _dBContext.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.Id == categoryId);

            if(category == null)
            {
                return Result<ReturnCategory>.Fail("Categoria não encontrada");
            }

            return Result<ReturnCategory>.Ok(CategoryMapping.ToReturnCategory(category));
        }

        public async Task<Result<ReturnCategory>> UpdateCategoryAsync(Guid id, CategoryDto update, Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var category = await _dBContext.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if(category == null)
            {
                return Result<ReturnCategory>.Fail("Categoria não encontrada");
            }

            if(category.CategoryType != update.CategoryType && update.CategoryType == CategoryType.Ambos)
            {
                var hasTransactions = await _dBContext.Transactions.AnyAsync(t => t.CategoryId == category.Id);
                if(hasTransactions)
                {
                    await _dBContext.Transactions.Where(t => t.CategoryId == category.Id && (int)t.TransactionType != (int)update.CategoryType)
                                         .ExecuteUpdateAsync(setter => setter.SetProperty(x => x.CategoryId, (Guid?)null));
                }
            }

            category = CategoryMapping.ToUpdateCategory(category, update);

            await _dBContext.SaveChangesAsync();

            return Result<ReturnCategory>.Ok(CategoryMapping.ToReturnCategory(category));
        }
    }
}
