using Core.Managers;
using Core.Models;
using Core.Models.Contracts;
using Core.Ports.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Web.Api.Controllers
{
    [Route("api/currency")]
    [ApiController]
    public sealed class CurrencyController : ControllerBase
    {
        private readonly CurrencyManager _currencyManager;

        public CurrencyController(ICurrencyRepository currencyRepository) 
            => _currencyManager = new CurrencyManager(currencyRepository);

        [HttpPost]
        public IActionResult StoreCurrency(CurrencyType request)
        {
            IOperationResult<CurrencyType> operationResult = _currencyManager.StoreCurrencyType(request);

            return operationResult.Success
                ? Ok(operationResult.Entity)
                : (IActionResult)BadRequest(operationResult.Message);
        }

        [HttpPut]
        public IActionResult UpdateCurrency(CurrencyType request)
        {
            IOperationResult<CurrencyType> operationResult = _currencyManager.EditCurrency(request);

            return operationResult.Success
                ? Ok(operationResult.Entity)
                : (IActionResult)BadRequest(operationResult.Message);
        }

        [HttpGet]
        public IActionResult GetAll()
            => Ok(_currencyManager.GetAll());

        [HttpDelete]
        public IActionResult Delete(long currencyId)
        {
            IOperationResult<CurrencyType> result = _currencyManager.DeleteCurrency(currencyId);

            return result.Success ?
                Ok(result.Success)
                : (IActionResult)BadRequest(result.Message);
        }
    }
}
