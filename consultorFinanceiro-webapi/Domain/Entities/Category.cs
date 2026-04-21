using consultorFinanceiro_webapi.Domain.Enum;

namespace consultorFinanceiro_webapi.Domain.Entities
{
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public string? Description { get; set; }
        public CategoryType CategoryType { get; set; }
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;
        public bool IsDeleted { get; set; } = false;

        //Usuario
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
