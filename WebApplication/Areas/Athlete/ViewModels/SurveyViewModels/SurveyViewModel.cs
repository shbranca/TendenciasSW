using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Areas.Athlete.ViewModels
{
    public class SurveyViewModel
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "Nombre", Prompt = "Nombre de la encuesta")]
        public string Name { get; set; }

        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "Descripción", Prompt = "Descripción de la encuesta")]
        public string Description { get; set; }

        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "Código", Prompt = "Código de la encuesta")]
        public string Code { get; set; }

        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "Fecha de publicación", Prompt = "Fecha de publicación")]
        public string PublicationDate { get; set; }

        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "Fecha de finalización", Prompt = "Fecha de finalización")]
        public string FinishDate { get; set; }
    }
}
