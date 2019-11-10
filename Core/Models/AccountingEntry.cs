using Core.Enums;
using System;
using Core.Models.Contracts;

namespace Core.Models
{
    public sealed class AccountingEntry : IEntityBase
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public long AuxiliaryAccountId { get; set; }
        public AuxiliaryAccount AuxiliaryAccount { get; set; }
        public string Account { get; set; }
        public AccountOrigin MovementType { get; set; }
        public DateTime Created { get; set; }
        public string Period { get; set; }
        public long Amount { get; set; }
        public long CurrencyTypeId { get; set; }
        public CurrencyType CurrencyType { get; set; }
        public GeneralStatus Status { get; set; }
    }
}
