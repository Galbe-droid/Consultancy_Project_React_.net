using consultorFinanceiro_webapi.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace consultorFinanceiro_webapi.Application.Dtos.Category
{
    public class CategoryDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Title must have at least 3 characters")]
        [MaxLength(18, ErrorMessage = "Title must have a maximum of 18 characters")]
        public string Name { get; set; }
        [MaxLength(400, ErrorMessage = "Description must have a maximum of 400 characters")]
        public string? Description { get; set; }
        [Required]
        public CategoryType CategoryType { get; set; }
    }
}
