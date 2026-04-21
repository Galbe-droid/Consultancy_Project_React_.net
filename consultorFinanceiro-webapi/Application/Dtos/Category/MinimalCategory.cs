using consultorFinanceiro_webapi.Domain.Enum;

namespace consultorFinanceiro_webapi.Application.Dtos.Category
{
    public class MinimalCategory
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public CategoryType CategoryType { get; set; }
    }
}
