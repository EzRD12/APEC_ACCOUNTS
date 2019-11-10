namespace Core.Models.Response
{
    public sealed class AccountingEntryResponse
    {
        public AccountingEntryResponse(long creditEntryId, long debitEntryId)
        {
            CreditEntryId = creditEntryId;
            DebitEntryId = debitEntryId;
        }

        public long CreditEntryId { get; set; }
        public long DebitEntryId { get; set; }
    }
}
