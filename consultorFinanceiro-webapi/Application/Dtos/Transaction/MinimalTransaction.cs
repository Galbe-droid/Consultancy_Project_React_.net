using consultorFinanceiro_webapi.Domain.Enum;

namespace consultorFinanceiro_webapi.Application.Dtos.Transaction
{
    public class MinimalTransaction
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public TransactionType TransactionType { get; set; }

        //Usuario
        public Guid UserId { get; set; }
    }
}
