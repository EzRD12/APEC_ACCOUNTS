using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Context.Configuration
{
    internal sealed class AuxiliaryAccountConfiguration: IEntityTypeConfiguration<AuxiliaryAccount>
    {
        public void Configure(EntityTypeBuilder<AuxiliaryAccount> builder)
        {
            builder.HasKey(instance => instance.Id);
        }
    }
}
