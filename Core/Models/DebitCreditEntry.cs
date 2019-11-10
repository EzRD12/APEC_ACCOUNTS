namespace Core.Models
{
    public sealed class DebitCreditEntry
    {
        public DebitCreditEntry(long debitEntryId, long creditEntryId)
        {
            DebitEntryId = debitEntryId;
            CreditEntryId = creditEntryId;
        }

        public long DebitEntryId { get; }
        public long CreditEntryId { get; }
        public AccountingEntry AccountingEntryDebit { get; set; }
        public AccountingEntry AccountingEntryCredit { get; set; }
    }
}
