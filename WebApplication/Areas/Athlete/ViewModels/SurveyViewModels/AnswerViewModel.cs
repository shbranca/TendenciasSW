using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Areas.Athlete.ViewModels
{
    public class AnswerViewModel
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid QuestionId { get; set; }

        [Required]
        public String Description { get; set; }
    }
}
