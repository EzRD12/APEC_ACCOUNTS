using System.Linq;
using Core.Models;
using Core.Models.Contracts;
using Core.Ports.Repositories;
using Persistence.Context;

namespace Persistence.Repositories
{
    public sealed class DebitCreditEntryRepository : IDebitCreditEntryRepository
    {
        private readonly AccountingContext _dbContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="DebitCreditEntryRepository"/> class to the value indicated
        /// </summary>
        /// <param name="accountingContext">A <see cref="AccountingContext"/></param>
        public DebitCreditEntryRepository(AccountingContext accountingContext)
            => _dbContext = accountingContext;

        IOperationResult<DebitCreditEntry> IDebitCreditEntryRepository.Create(DebitCreditEntry entity)
        {
            DebitCreditEntry entry = _dbContext.DebitCreditEntries.Add(entity).Entity;
            _dbContext.SaveChanges();
            return BasicOperationResult<DebitCreditEntry>.Ok(entry);
        }

        IOperationResult<DebitCreditEntry> IDebitCreditEntryRepository.Find(long entryId)
        {
            DebitCreditEntry debitCreditEntry = _dbContext.DebitCreditEntries.FirstOrDefault(entry => entry.CreditEntryId == entryId || entry.DebitEntryId == entryId);
            
            return BasicOperationResult<DebitCreditEntry>.Ok(debitCreditEntry);
        }

        IOperationResult<bool> IDebitCreditEntryRepository.Delete(DebitCreditEntry entity)
        {
            try
            {
                _dbContext.DebitCreditEntries.Remove(entity);
                _dbContext.SaveChanges();
                return BasicOperationResult<bool>.Ok(true);
            }
            catch (System.Exception ex)
            {
                return BasicOperationResult<bool>.Fail(ex.Message);
            }
        }
    }
}
