using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Areas.Coach.ViewModels.AthleteViewModels
{
    public class EvolutionAthleteViewModel
    {
        public Guid Id { get; set; }
        public string AthleteId { get; set; }
        public string Name { get; set; }

        [Required(ErrorMessage ="El campo '{0}' es obligatorio")]
        [Display(Name ="50 metros")]
        public decimal FiftyMeters { get; set; }
        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "100 metros")]
        public decimal OneHundredMeters { get; set; }
        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "400 metros")]
        public decimal FourHundredMeters { get; set; }
    }
}
