using consultorFinanceiro_webapi.Domain.Enum;

namespace consultorFinanceiro_webapi.Application.Dtos.Transaction
{
    public class ReturnTransaction
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public TransactionType TransactionType { get; set; }
        public DateTimeOffset CreatedDate { get; set; }

        //Categoria 
        public Guid? CategoryId { get; set; }

        //Usuario
        public Guid UserId { get; set; }
    }
}
