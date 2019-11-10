using Core.Models;
using Core.Ports.Repositories;
using FluentValidation;

namespace Core.Validations
{
    internal sealed class AccountingEntryValidator: AbstractValidator<AccountingEntry>
    {
        private readonly IAccountEntryRepository _accountEntryRepository;

        public AccountingEntryValidator(IAccountEntryRepository accountEntryRepository)
        {
            _accountEntryRepository = accountEntryRepository;
            RuleSet("Storage", () =>
                {
                    RuleFor(request => request.Account).NotNull().NotEmpty().WithMessage("InvalidAccount");
                    RuleFor(request => request.Description).NotNull().NotEmpty().WithMessage("InvalidDescription");
                    RuleFor(request => request.Period).NotNull().NotEmpty().WithMessage("InvalidPeriod");
                    RuleFor(request => request.MovementType).IsInEnum().WithMessage("InvalidMovementType");
                    RuleFor(request => request.AuxiliaryAccountId).GreaterThan(0).WithMessage("InvalidAccountingModuleId");
                    RuleFor(request => request.AuxiliaryAccountId)
                        .Must(moduleId => _accountEntryRepository.AuxiliaryAccountExists(module => module.Id == moduleId)).WithMessage("InvalidAccountingModuleDoesNotExists");
                    RuleFor(request => request.AuxiliaryAccountId)
                        .Must(moduleId => _accountEntryRepository.AuxiliaryAccountExists(module => module.Id == moduleId && module.Active)).WithMessage("InvalidAccountingModuleNotActive");
                });
        }
    }
}
