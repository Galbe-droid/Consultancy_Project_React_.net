using consultorFinanceiro_webapi.Application.Dtos.Category;
using consultorFinanceiro_webapi.Domain.Entities;

namespace consultorFinanceiro_webapi.API.Mapping
{
    public class CategoryMapping
    {
        public static Category ToCategory (CategoryDto categoryDto, Guid userId)
        {
            return new Category{
                Name = categoryDto.Name,
                Description = categoryDto.Description,
                CategoryType = categoryDto.CategoryType,
                UserId = userId,
            };
        }

        public static ReturnCategory ToReturnCategory(Category category)
        {
            return new ReturnCategory
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                CategoryType = category.CategoryType,
                UserId = category.UserId,
            };
        }

        public static MinimalCategory ToMinimalCategory(Category category)
        {
            return new MinimalCategory
            {
                Id = category.Id,
                Name = category.Name,
                CategoryType = category.CategoryType,
            };
        }

        public static Category ToUpdateCategory(Category category, CategoryDto categoryDto)
        {
            category.Name = categoryDto.Name;
            category.Description = categoryDto.Description;
            category.CategoryType = categoryDto.CategoryType;

            return category;
        }

        public static List<ReturnCategory> ToListReturnCategory(List<Category> categories)
        {
            return (from Category category in categories
                    select ToReturnCategory(category)).ToList();
        }

        public static List<MinimalCategory> ToListMinimalCategory(List<Category> categories)
        {
            return (from Category category in categories
                    select ToMinimalCategory(category)).ToList();
        }
    }
}
