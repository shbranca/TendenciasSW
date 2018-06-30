using System;
using System.Collections.Generic;
using System.Text;
using WebApplication.ModelActions;

namespace DAL.Models
{
    public class EvolutionAthlete: SoftDelete
    {
        public Guid Id { get; set; }
        public ApplicationUser Athlete { get; set; }
        public decimal FiftyMeters { get; set; }
        public decimal OneHundredMeters { get; set; }
        public decimal FourHundredMeters { get; set; }
    }
}
