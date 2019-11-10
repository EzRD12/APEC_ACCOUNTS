namespace Core.Models
{
    public sealed class AccountingEntryRequest
    {
        public AccountingEntry AccountingEntryDebit { get; set; }
        public AccountingEntry AccountingEntryCredit { get; set; }
    }
}
