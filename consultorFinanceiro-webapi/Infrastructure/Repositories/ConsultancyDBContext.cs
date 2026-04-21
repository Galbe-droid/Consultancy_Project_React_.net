using consultorFinanceiro_webapi.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace consultorFinanceiro_webapi.Infrastructure.Repositories
{
    public class ConsultancyDBContext : DbContext
    {
        public Guid CurrentUserId { get; set; }
        public ConsultancyDBContext(DbContextOptions<ConsultancyDBContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transaction>()
                .HasQueryFilter(t => !t.IsDeleted && (CurrentUserId == Guid.Empty || t.UserId == CurrentUserId));

            modelBuilder.Entity<Category>()
                .HasQueryFilter(c => !c.IsDeleted && (CurrentUserId == Guid.Empty || c.UserId == CurrentUserId));

            modelBuilder.Entity<User>()
                .HasQueryFilter(u => !u.IsDeleted);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Transaction>()
                .HasIndex(t => t.UserId);

            modelBuilder.Entity<Transaction>()
                .HasIndex(t => t.CategoryId);

            modelBuilder.Entity<Category>()
                .HasIndex(c => c.UserId);
        }
    }
}
