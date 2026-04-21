using consultorFinanceiro_webapi.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace consultorFinanceiro_webapi.Application.Dtos.Transaction
{
    public class TransactionDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Title must have at least 3 characters")]
        [MaxLength(18, ErrorMessage = "Title must have a maximum of 18 characters")]
        public string Title { get; set; }
        [MaxLength(400, ErrorMessage = "Description must have a maximum of 400 characters")]
        public string? Description { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public TransactionType TransactionType { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
