using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Context.Configuration
{
    public sealed class AccountingAccountsConfiguration : IEntityTypeConfiguration<AccountingAccount>
    {
        public void Configure(EntityTypeBuilder<AccountingAccount> builder)
        {
            builder.HasKey(p => p.Id);
        }
    }
}