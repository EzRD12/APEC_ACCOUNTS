using Core.Models;
using Core.Models.Contracts;

namespace Core.Ports.Repositories
{
    public interface IDebitCreditEntryRepository
    {
        IOperationResult<DebitCreditEntry> Create(DebitCreditEntry entity);
        IOperationResult<DebitCreditEntry> Find(long entryId);
        IOperationResult<bool> Delete(DebitCreditEntry entity);
    }
}
