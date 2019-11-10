using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;

namespace Persistence.Context
{
    public class DefaultDbContextFactory : IDesignTimeDbContextFactory<AccountingContext>
    {
        private readonly IConfigurationRoot _config;

        public DefaultDbContextFactory()
        {
            var basePath = AppContext.BaseDirectory;
            var environmentName = Environment.GetEnvironmentVariable("Hosting:Environment");

            var builder = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{environmentName}.json", true)
                .AddEnvironmentVariables();

            _config = builder.Build();
        }

        public AccountingContext CreateDbContext(string[] args)
            => Create(_config.GetConnectionString("AccountingDatabase"));

        AccountingContext Create(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException($"{nameof(connectionString)} is null or empty.", nameof(connectionString));
            }

            var optionsBuilder = new DbContextOptionsBuilder<AccountingContext>();

            optionsBuilder.UseSqlServer(connectionString);

            return new AccountingContext(optionsBuilder.Options);
        }
    }
}
