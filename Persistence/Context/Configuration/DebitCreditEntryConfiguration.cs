using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Context.Configuration
{
    internal sealed class DebitCreditEntryConfiguration : IEntityTypeConfiguration<DebitCreditEntry>
    {

        public void Configure(EntityTypeBuilder<DebitCreditEntry> builder)
        {
            builder.HasKey(id => new {id.DebitEntryId, id.CreditEntryId});
        }
    }
}
