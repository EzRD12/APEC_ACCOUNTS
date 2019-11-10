using Core.Enums;

namespace Core.Models
{
    public sealed class AuxiliaryAccount
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
    }
}
