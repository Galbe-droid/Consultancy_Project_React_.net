using consultorFinanceiro_webapi.Application.Common;
using consultorFinanceiro_webapi.Application.Dtos.Dashboard;
using consultorFinanceiro_webapi.Application.Interfaces;
using consultorFinanceiro_webapi.Domain.Enum;
using consultorFinanceiro_webapi.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace consultorFinanceiro_webapi.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ConsultancyDBContext _dBContext;

        public DashboardService(ConsultancyDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<Result<List<UserFinanceSummary>>> GetUsersFinanceSummaryAsync()
        {
            var users = await _dBContext.Users
                .IgnoreQueryFilters()
                .Where(u => !u.IsDeleted)
                .ToListAsync();

            var transactions = await _dBContext.Transactions
                .IgnoreQueryFilters()
                .Where(t => !t.IsDeleted)
                .ToListAsync();

            var result = users.Select(u =>
            {
                var userTransactions = transactions
                    .Where(t => t.UserId == u.Id);

                var income = userTransactions
                    .Where(t => t.TransactionType == TransactionType.Receita)
                    .Sum(t => t.Amount);

                var expense = userTransactions
                    .Where(t => t.TransactionType == TransactionType.Despesa)
                    .Sum(t => t.Amount);

                return new UserFinanceSummary
                {
                    Id = u.Id,
                    Name = u.Name,
                    SurName = u.SurName,
                    Income = income,
                    Expense = expense,
                    Balance = income - expense
                };
            }).ToList();

            return Result<List<UserFinanceSummary>>.Ok(result);
        }
    }
}
