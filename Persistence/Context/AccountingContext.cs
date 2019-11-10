using System.Linq;
using Core.Enums;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Context.Configuration;
using AccountType = Core.Models.AccountType;

namespace Persistence.Context
{
    public sealed class AccountingContext: DbContext
    {
        private readonly DbContext _dbContext;

        /// <summary>
        /// Builds an instance of <see cref="AccountingContext"/> class.
        /// </summary>
        /// <param name="options">A <see cref="DbContextOptions"/></param>
        public AccountingContext(DbContextOptions options) : base(options) { }

        public AccountingContext(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        internal DbSet<AccountingAccount> AccountingAccounts { get; set; }

        internal DbSet<AccountingEntry> AccountingEntries { get; set; }

        internal DbSet<AccountReceivables> AccountReceivables { get; set; }

        internal DbSet<AccountType> AccountTypes { get; set; }

        internal DbSet<AuxiliaryAccount> AuxiliaryAccounts { get; set; }

        internal DbSet<CurrencyType> CurrencyTypes { get; set; }
        internal DbSet<DebitCreditEntry> DebitCreditEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var pb in modelBuilder.Model.GetEntityTypes().SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(string))
                .Select(p => modelBuilder.Entity(p.DeclaringEntityType.ClrType).Property(p.Name)))
            {
                pb.HasColumnType("varchar(400)");
            }

            BuildData(modelBuilder);

            ApplyConfigurations(modelBuilder);
        }
        private static void BuildData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuxiliaryAccount>().HasData(
                new AuxiliaryAccount { Id = 1, Description = "Contabilidad", Active = true}
                ,new AuxiliaryAccount { Id = 2, Description = "Nomina", Active = true }
                ,new AuxiliaryAccount { Id = 3,Description = "Facturación", Active = true }
                ,new AuxiliaryAccount { Id = 4,Description = "Inventario", Active = true }
                ,new AuxiliaryAccount { Id = 5,Description = "Cuentas x Cobrar", Active = true }
                ,new AuxiliaryAccount { Id = 6,Description = "Cuentas x Pagar", Active = true }
                ,new AuxiliaryAccount { Id = 7,Description = "Compras", Active = true }
                ,new AuxiliaryAccount { Id = 8,Description = "Activos fijos", Active = true }
                ,new AuxiliaryAccount { Id = 9, Description = "Cheques", Active = true }
                );

            modelBuilder.Entity<CurrencyType>().HasData(
                new CurrencyType {Id = 1, Description = "Peso", LastExchangeRate = 1, Status = GeneralStatus.Active},
                new CurrencyType { Id = 2, Description = "Dolar Americano", LastExchangeRate = 45.87, Status = GeneralStatus.Active },
                new CurrencyType {Id = 3, Description = "Euro", LastExchangeRate = 57.89, Status = GeneralStatus.Active}
            );
        }

        private static void ApplyConfigurations(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AccountingAccountsConfiguration());
            modelBuilder.ApplyConfiguration(new AccountingEntriesConfiguration());
            modelBuilder.ApplyConfiguration(new AccountReceivablesesConfiguration());
            modelBuilder.ApplyConfiguration(new AccountTypesConfiguration());
            modelBuilder.ApplyConfiguration(new AuxiliaryAccountConfiguration());
            modelBuilder.ApplyConfiguration(new CurrencyTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DebitCreditEntryConfiguration());
        }
    }
}
