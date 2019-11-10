using Core.Models;
using Core.Ports.Repositories;
using Persistence.Context;

namespace Persistence.Repositories
{
    public sealed class CurrencyRepository : BaseRepository<CurrencyType>, ICurrencyRepository
    {
        private readonly AccountingContext _dbContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountingEntryRepository"/> class to the value indicated
        /// </summary>
        /// <param name="accountingContext">A <see cref="AccountingContext"/></param>
        public CurrencyRepository(AccountingContext accountingContext)
            : base(accountingContext)
            => _dbContext = accountingContext;
    }
}
