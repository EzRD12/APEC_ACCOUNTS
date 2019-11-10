using Core.Models;
using Core.Ports.Repositories;
using Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Core.Enums;

namespace Persistence.Repositories
{
    public sealed class AccountingEntryRepository: BaseRepository<AccountingEntry>, IAccountEntryRepository
    {
        private readonly AccountingContext _dbContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountingEntryRepository"/> class to the value indicated
        /// </summary>
        /// <param name="accountingContext">A <see cref="AccountingContext"/></param>
        public AccountingEntryRepository(AccountingContext accountingContext)
            : base(accountingContext)
            => _dbContext = accountingContext;

        long IAccountEntryRepository.StoreAccountingEntry(AccountingEntry model)
        {
            model.Created = DateTime.Now;
            model.Status = GeneralStatus.Active;
            AccountingEntry accountSaved = _dbContext.AccountingEntries.Add(model).Entity;
            _dbContext.SaveChanges();
            return accountSaved.Id;
        }

        bool IAccountEntryRepository.AuxiliaryAccountExists(Expression<Func<AuxiliaryAccount, bool>> predicate) 
            => _dbContext.AuxiliaryAccounts.Any(predicate);

        ISet<AccountingEntry> IAccountEntryRepository.GetAll() 
            => _dbContext.AccountingEntries.ToHashSet();

        ISet<AuxiliaryAccount> IAccountEntryRepository.GetAuxiliaryAccountsActives() 
            => _dbContext.AuxiliaryAccounts.Where(account => account.Active).ToHashSet();
        ISet<AuxiliaryAccount> IAccountEntryRepository.GetAuxiliaryAccounts()
            => _dbContext.AuxiliaryAccounts.ToHashSet();
    }
}
