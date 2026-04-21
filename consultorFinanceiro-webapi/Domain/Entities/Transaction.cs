using consultorFinanceiro_webapi.Domain.Enum;

namespace consultorFinanceiro_webapi.Domain.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public TransactionType TransactionType { get; set; }
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;
        public bool IsDeleted { get; set; } = false;

        //Categoria 
        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }

        //Usuario
        public Guid UserId { get; set; }
        public User User { get; set; }



    }
}
