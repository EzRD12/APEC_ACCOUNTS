using Core.Models;
using Core.Models.Contracts;
using Core.Ports.Repositories;
using System.Collections.Generic;

namespace Core.Managers
{
    public sealed class CurrencyManager
    {
        private readonly ICurrencyRepository _currencyRepository;

        public CurrencyManager(ICurrencyRepository currencyRepository) 
            => _currencyRepository = currencyRepository;

        public IOperationResult<CurrencyType> StoreCurrencyType(CurrencyType currencyType)
        {
            if (currencyType == null)
            {
                return BasicOperationResult<CurrencyType>.Fail("InvalidCurrencyTypeInstance");
            }

            if (string.IsNullOrEmpty(currencyType.Description))
            {
                return BasicOperationResult<CurrencyType>.Fail("InvalidDescription");
            }

            return _currencyRepository.Create(currencyType);
        }

        public IEnumerable<CurrencyType> GetAll() 
            => _currencyRepository.Get();

        public IOperationResult<CurrencyType> DeleteCurrency(long currencyId)
        {
            CurrencyType currencyType = _currencyRepository.Find(currency => currency.Id == currencyId);
            return _currencyRepository.Remove(currencyType);
        }

        public IOperationResult<CurrencyType> FindCurrency(long currencyId)
        {
            CurrencyType currencyType = _currencyRepository.Find(currency => currency.Id == currencyId);

            return currencyType != null 
                ? BasicOperationResult<CurrencyType>.Ok(currencyType) 
                : BasicOperationResult<CurrencyType>.Fail("NotFound");
        }

        public IOperationResult<CurrencyType> EditCurrency(CurrencyType currencyType) 
            => _currencyRepository.Update(currencyType);
    }
}
