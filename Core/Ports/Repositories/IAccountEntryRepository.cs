using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Core.Models;

namespace Core.Ports.Repositories
{
    public interface IAccountEntryRepository : IGenericRepository<AccountingEntry>
    {
        long StoreAccountingEntry(AccountingEntry model);
        bool AuxiliaryAccountExists(Expression<Func<AuxiliaryAccount, bool>> predicate);
        ISet<AccountingEntry> GetAll();
        ISet<AuxiliaryAccount> GetAuxiliaryAccountsActives();
        ISet<AuxiliaryAccount> GetAuxiliaryAccounts();
    }
}
