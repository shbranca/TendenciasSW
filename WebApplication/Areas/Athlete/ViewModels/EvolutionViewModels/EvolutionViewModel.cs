using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Areas.Athlete.ViewModels.EvolutionViewModels
{
    public class EvolutionViewModel
    {
        public decimal FiftyMeters { get; set; } 
        public decimal OneHundredMeters { get; set; } 
        public decimal FourHundredMeters { get; set; }
        public string CreatedAt { get; set; }
    }
}
