using System;
using Core.Enums;

namespace Core.Models
{
    public sealed class AccountReceivables
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public bool AllowTransactions { get; set; }
        public AccountType AccountType { get; set; }
        public long AccountTypeId { get; set; }
        public LevelType Level { get; set; }
        public string BiggerAccount { get; set; }
        public long Balance { get; set; }
        public GeneralStatus Status { get; set; }
    }
}
