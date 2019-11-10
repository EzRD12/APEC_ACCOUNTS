using Core.Enums;

namespace Core.Models
{
    public sealed class AccountingAccount
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public bool AllowMovement { get; set; }
        public Enums.AccountType Type { get; set; }
        public LevelType LevelType { get; set; }
        public long Balance { get; set; }
        public string BiggerAccount { get; set; }
    }
}
