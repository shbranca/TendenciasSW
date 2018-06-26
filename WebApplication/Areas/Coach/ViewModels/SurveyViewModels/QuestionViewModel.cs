using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Areas.Coach.ViewModels
{
    public class QuestionViewModel
    {
        public Guid Id { get; set; }

        public Guid SurveyId { get; set; }

        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "Tipo", Prompt = "Tipo de pregunta")]
        public int Type { get; set; }

        [Required(ErrorMessage = "El campo '{0}' es obligatorio")]
        [Display(Name = "Descripción", Prompt = "Descripción de pregunta")]
        public String Description { get; set; }

        public List<AnswerViewModel> Answers { get; set; }
    }
}
