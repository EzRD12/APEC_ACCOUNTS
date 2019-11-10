using Core.Managers;
using Core.Models;
using Core.Models.Contracts;
using Core.Ports.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class AccountEntryController : ControllerBase
    {
        private readonly AccountingEntriesManager _accountingEntriesManager;

        public AccountEntryController(IAccountEntryRepository accountEntryRepository, IDebitCreditEntryRepository debitCreditEntryRepository)
        {
            _accountingEntriesManager = new AccountingEntriesManager(accountEntryRepository, debitCreditEntryRepository);
        }

        [HttpPost]
        [Route("account-entry")]
        public IActionResult StoreAccountingEntry(IList<AccountingEntry> request)
        {
            IOperationResult<DebitCreditEntry> operationResult = _accountingEntriesManager.StoreAccountingEntry(request);

            return operationResult.Success 
                ? Ok(operationResult.Entity) 
                : (IActionResult)BadRequest(operationResult.Message);
        }

        [HttpPut]
        [Route("account-entry")]
        public IActionResult UpdateCurrency(AccountingEntry request)
        {
            IOperationResult<AccountingEntry> operationResult = _accountingEntriesManager.UpdateAccounting(request);

            return operationResult.Success
                ? Ok(operationResult.Entity)
                : (IActionResult)BadRequest(operationResult.Message);
        }

        [HttpGet]
        [Route("account-entry")]
        public IActionResult GetAll()
            => Ok(_accountingEntriesManager.GetAllAccountingEntries().Entity);

        [HttpGet]
        [Route("auxiliary-accounts/active")]
        public IActionResult GetActivesAuxiliaryAccounts()
            => Ok(_accountingEntriesManager.GetActiveAuxiliaryAccounts().Entity);

        [HttpGet]
        [Route("auxiliary-accounts")]
        public IActionResult GetAuxiliaryAccounts()
            => Ok(_accountingEntriesManager.GetAllAuxiliaryAccounts());

        [HttpDelete]
        [Route("account-entry/{entryId}")]
        public IActionResult Delete(long entryId)
        {
            IOperationResult<bool> result = _accountingEntriesManager.DeleteAccountingEntry(entryId);

            return result.Success ?
                Ok(result.Success)
                : (IActionResult)BadRequest(result.Message);
        }
    }
}
