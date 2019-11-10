using Core.Enums;
using Core.Models;
using Core.Models.Contracts;
using Core.Models.Response;
using Core.Ports.Repositories;
using Core.Validations;
using FluentValidation;
using System.Collections.Generic;
using System.Linq;
using FluentValidationsResult = FluentValidation.Results.ValidationResult;

namespace Core.Managers
{
    public sealed class AccountingEntriesManager
    {
        private readonly IAccountEntryRepository _accountEntryRepository;
        private readonly IDebitCreditEntryRepository _debitCreditEntryRepository;

        public AccountingEntriesManager(IAccountEntryRepository accountEntryRepository, IDebitCreditEntryRepository debitCreditEntryRepository)
        {
            _accountEntryRepository = accountEntryRepository;
            _debitCreditEntryRepository = debitCreditEntryRepository;
        }

        public IOperationResult<DebitCreditEntry> StoreAccountingEntry(IList<AccountingEntry> requests)
        {
            if (requests.Count != 2)
            {
                return BasicOperationResult<DebitCreditEntry>.Fail("InvalidCountOfRequests");
            }

            if (requests[0] == null || requests[1] == null)
            {
                return BasicOperationResult<DebitCreditEntry>.Fail("InvalidRequest");
            }

            if (requests[0].Amount != requests[1].Amount)
            {
                return BasicOperationResult<DebitCreditEntry>.Fail("InvalidAmountOfCreditAndDebit");
            }

            var validator = new AccountingEntryValidator(_accountEntryRepository);
            FluentValidationsResult validationResult = validator.Validate(requests[0], "Storage");
            FluentValidationsResult validationResult2 = validator.Validate(requests[1], "Storage");

            if (!validationResult.IsValid)
            {
                string errorMessages = string.Join("\n", validationResult.Errors.Select(errorsFound => errorsFound.ErrorMessage));
                string errorMessages2 = string.Join("\n", validationResult2.Errors.Select(errorsFound => errorsFound.ErrorMessage));

                string messageResults = errorMessages + errorMessages2;
                return BasicOperationResult<DebitCreditEntry>.Fail(messageResults);
            }

            long accountCreditEntryId = _accountEntryRepository.StoreAccountingEntry(requests.FirstOrDefault(request => request.MovementType == AccountOrigin.Credit));
            long accountDebitEntryId = _accountEntryRepository.StoreAccountingEntry(requests.FirstOrDefault(request => request.MovementType == AccountOrigin.Debit));

            var entry = new DebitCreditEntry(accountDebitEntryId, accountCreditEntryId);

            IOperationResult<DebitCreditEntry> entryResult = _debitCreditEntryRepository.Create(entry);

            return entryResult;
        }

        public IOperationResult<ISet<AccountingEntry>> GetAllAccountingEntries() 
            => BasicOperationResult<ISet<AccountingEntry>>.Ok(_accountEntryRepository.GetAll());

        public IOperationResult<ISet<AuxiliaryAccount>> GetActiveAuxiliaryAccounts()
            => BasicOperationResult<ISet<AuxiliaryAccount>>.Ok(_accountEntryRepository.GetAuxiliaryAccountsActives());

        public IOperationResult<ISet<AuxiliaryAccount>> GetAllAuxiliaryAccounts()
            => BasicOperationResult<ISet<AuxiliaryAccount>>.Ok(_accountEntryRepository.GetAuxiliaryAccounts());

        public IOperationResult<bool> DeleteAccountingEntry(long entryId)
        {
            try
            {
                var debitCredit = _debitCreditEntryRepository.Find(entryId).Entity;

                if (debitCredit == null)
                {
                    return BasicOperationResult<bool>.Fail("EntryNotFound");
                }

                _debitCreditEntryRepository.Delete(debitCredit);

                AccountingEntry debitEntry = _accountEntryRepository.Find(e => e.Id == debitCredit.DebitEntryId);
                _accountEntryRepository.Remove(debitEntry);

                AccountingEntry creditEntry = _accountEntryRepository.Find(e => e.Id == debitCredit.CreditEntryId);
                _accountEntryRepository.Remove(creditEntry);
                _accountEntryRepository.Save();

                return BasicOperationResult<bool>.Ok(true);
            }
            catch (System.Exception ex)
            {
                return BasicOperationResult<bool>.Fail(ex.Message);
            }
        }

        public IOperationResult<AccountingEntry> FindAccountingEntry(long accountingEntryId)
        {
            AccountingEntry accountingEntry = _accountEntryRepository.Find(currency => currency.Id == accountingEntryId);

            return accountingEntry != null
                ? BasicOperationResult<AccountingEntry>.Ok(accountingEntry)
                : BasicOperationResult<AccountingEntry>.Fail("NotFound");
        }

        public IOperationResult<AccountingEntry> UpdateAccounting(AccountingEntry accountingEntry)
        {
            IOperationResult<AccountingEntry> result = _accountEntryRepository.Update(accountingEntry);
            _accountEntryRepository.Save();
            return result;
        }
    }
}
