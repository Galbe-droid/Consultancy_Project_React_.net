    namespace consultorFinanceiro_webapi.Application.Dtos.Dashboard
{
    public class UserFinanceSummary
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string SurName { get; set; }

        public decimal Income { get; set; }

        public decimal Expense { get; set; }

        public decimal Balance { get; set; }
    }
}
