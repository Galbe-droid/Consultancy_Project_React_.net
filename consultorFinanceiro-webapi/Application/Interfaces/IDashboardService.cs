using consultorFinanceiro_webapi.Application.Common;
using consultorFinanceiro_webapi.Application.Dtos.Dashboard;

namespace consultorFinanceiro_webapi.Application.Interfaces
{
    public interface IDashboardService
    {
        public Task<Result<List<UserFinanceSummary>>> GetUsersFinanceSummaryAsync();
    }
}
