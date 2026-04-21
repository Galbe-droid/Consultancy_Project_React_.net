using consultorFinanceiro_webapi.Domain.Enum;

namespace consultorFinanceiro_webapi.Application.Dtos.Category
{
    public class ReturnCategory
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public CategoryType CategoryType { get; set; }
        public DateTimeOffset CreatedDate { get; set; }

        //Usuario
        public Guid UserId { get; set; }
    }
}
