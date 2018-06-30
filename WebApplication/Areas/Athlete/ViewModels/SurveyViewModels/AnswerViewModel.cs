using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Areas.Athlete.ViewModels
{
    public class AnswerViewModel
    { 
        public Guid Id { get; set; } 
        public Guid QuestionId { get; set; } 
        public String Description { get; set; }
    }
}
