using consultorFinanceiro_webapi.Application.Dtos.Transaction;
using consultorFinanceiro_webapi.Domain.Entities;
using consultorFinanceiro_webapi.Infrastructure.Repositories;
using System.Linq;

namespace consultorFinanceiro_webapi.API.Mapping
{
    public class TransactionMapping
    {
        public static Transaction ToTransaction(TransactionDto transactionDto, Guid userId)
        {
            return new Transaction
            {
                Title = transactionDto.Title,
                Description = transactionDto.Description,
                Amount = transactionDto.Amount,
                TransactionType = transactionDto.TransactionType,
                CategoryId = transactionDto.CategoryId,
                UserId = userId,
            };
        }

        public static Transaction ToUpdateTransaction(Transaction transaction, TransactionDto transactionDto)
        {
            transaction.Title = transactionDto.Title;
            transaction.Description = transactionDto.Description;
            transaction.Amount = transactionDto.Amount;
            transaction.TransactionType = transactionDto.TransactionType;
            transaction.CategoryId = transactionDto.CategoryId;

            return transaction;
        }

        public static ReturnTransaction ToReturnTransaction(Transaction transaction)
        {
            return new ReturnTransaction
            {
                Id = transaction.Id,
                Title = transaction.Title,
                Description = transaction.Description,
                Amount = transaction.Amount,
                CategoryId = transaction.CategoryId,
                TransactionType = transaction.TransactionType,
                CreatedDate = transaction.CreatedDate,
                UserId = transaction.UserId,
            };
        }

        public static MinimalTransaction ToMinimalTransaction(Transaction transaction)
        {
            return new MinimalTransaction
            {
                Id = transaction.Id,
                Title = transaction.Title,
                Amount = transaction.Amount,
                TransactionType = transaction.TransactionType,
                UserId = transaction.UserId,
            };
        }

        public static List<ReturnTransaction> ToListReturnTransaction(List<Transaction> transactionList)
        {
            return (from Transaction transaction in transactionList
                    select ToReturnTransaction(transaction)).ToList();
        }

        public static List<MinimalTransaction> ToListMinimalTransaction(List<Transaction> transactionList)
        {
            return (from Transaction transaction in transactionList
                    select ToMinimalTransaction(transaction)).ToList();
        }
    }
}
