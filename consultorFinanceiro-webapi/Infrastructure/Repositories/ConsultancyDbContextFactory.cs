using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace consultorFinanceiro_webapi.Infrastructure.Repositories
{
    public class ConsultancyDbContextFactory
    : IDesignTimeDbContextFactory<ConsultancyDBContext>
    {
        public ConsultancyDBContext CreateDbContext(string[] args)
        {
            Env.Load();

            var connection = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<ConsultancyDBContext>();
            optionsBuilder.UseNpgsql(connection);

            return new ConsultancyDBContext(optionsBuilder.Options);
        }
    }
}
