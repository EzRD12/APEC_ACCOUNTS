using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Context.Configuration
{
    class AccountReceivablesesConfiguration : IEntityTypeConfiguration<AccountReceivables>
    {
        public void Configure(EntityTypeBuilder<AccountReceivables> builder)
        {
            builder.HasKey(instance => instance.Id);
        }
    }
}