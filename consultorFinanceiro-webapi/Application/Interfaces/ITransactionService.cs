using consultorFinanceiro_webapi.Application.Common;
using consultorFinanceiro_webapi.Application.Dtos.Transaction;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;

namespace consultorFinanceiro_webapi.Application.Interfaces
{
    public interface ITransactionService
    {
        public Task<Result<List<ReturnTransaction>>> GetAllAsync(Guid userId);
        public Task<Result<List<MinimalTransaction>>> GetAllMinimalAsync(Guid userId);
        public Task<Result<ReturnTransaction>> GetByIdAsync(Guid id, Guid userId);
        public Task<Result<ReturnTransaction>> CreateTransactionAsync(TransactionDto create, Guid userId);
        public Task<Result<ReturnTransaction>> UpdateTransactionAsync(Guid id, TransactionDto update, Guid userId);
        public Task<Result<bool>> DeleteTransactionAsync(Guid id, Guid userId);
    }
}
