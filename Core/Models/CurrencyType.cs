using Core.Enums;
using Core.Models.Contracts;

namespace Core.Models
{
    public sealed class CurrencyType: IEntityBase
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public double LastExchangeRate { get; set; }
        public GeneralStatus Status { get; set; }
    }
}
