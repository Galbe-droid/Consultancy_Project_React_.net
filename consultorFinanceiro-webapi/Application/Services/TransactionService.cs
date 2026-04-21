using consultorFinanceiro_webapi.API.Mapping;
using consultorFinanceiro_webapi.Application.Common;
using consultorFinanceiro_webapi.Application.Dtos.Transaction;
using consultorFinanceiro_webapi.Application.Interfaces;
using consultorFinanceiro_webapi.Domain.Entities;
using consultorFinanceiro_webapi.Domain.Enum;
using consultorFinanceiro_webapi.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace consultorFinanceiro_webapi.Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ConsultancyDBContext _dBContext;

        public TransactionService(ConsultancyDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<Result<ReturnTransaction>> CreateTransactionAsync(TransactionDto create, Guid userId)
        {
            _dBContext.CurrentUserId = userId;
            Transaction transaction = TransactionMapping.ToTransaction(create, userId);

            await _dBContext.Transactions.AddAsync(transaction);
            await _dBContext.SaveChangesAsync();

            return Result<ReturnTransaction>.Ok(TransactionMapping.ToReturnTransaction(transaction));
        }

        public async Task<Result<bool>> DeleteTransactionAsync(Guid id, Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var transaction = await _dBContext.Transactions.FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
            {
                return Result<bool>.Fail("Transação não entrada");
            }

            transaction.IsDeleted = true;

            await _dBContext.SaveChangesAsync();
            return Result<bool>.Ok(true);
        }

        public async Task<Result<List<ReturnTransaction>>> GetAllAsync(Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var transactions = await _dBContext.Transactions.AsNoTracking().ToListAsync();

            return Result<List<ReturnTransaction>>.Ok(TransactionMapping.ToListReturnTransaction(transactions));
        }

        public async Task<Result<List<MinimalTransaction>>> GetAllMinimalAsync(Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var transactions = await _dBContext.Transactions.AsNoTracking().ToListAsync();

            return Result<List<MinimalTransaction>>.Ok(TransactionMapping.ToListMinimalTransaction(transactions));
        }

        public async Task<Result<ReturnTransaction>> GetByIdAsync(Guid id, Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var transaction = await _dBContext.Transactions.FirstOrDefaultAsync(t => t.Id == id);

            if(transaction == null)
            {
                return Result<ReturnTransaction>.Fail("Transação não encontrada");
            }

            return Result<ReturnTransaction>.Ok(TransactionMapping.ToReturnTransaction(transaction));
        }

        public async Task<Result<ReturnTransaction>> UpdateTransactionAsync(Guid id, TransactionDto update, Guid userId)
        {
            _dBContext.CurrentUserId = userId;

            var transaction = await _dBContext.Transactions.FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
            {
                return Result<ReturnTransaction>.Fail("Transação não encontrada");
            }

            transaction = TransactionMapping.ToUpdateTransaction(transaction, update);

            await _dBContext.SaveChangesAsync();

            return Result<ReturnTransaction>.Ok(TransactionMapping.ToReturnTransaction(transaction));
        }
    }
}
