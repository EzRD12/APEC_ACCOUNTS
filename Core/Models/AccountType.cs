using System;
using Core.Enums;

namespace Core.Models
{
    public sealed class AccountType
    {
        public long Id { get; set; }
        public long Description { get; set; }
        public AccountOrigin Origin { get; set; }
        public GeneralStatus Status { get; set; }
    }
}
