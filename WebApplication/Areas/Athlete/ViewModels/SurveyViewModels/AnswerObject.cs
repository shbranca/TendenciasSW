using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Areas.Athlete.ViewModels.SurveyViewModels
{
    public class AnswerObject
    {
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }
    }
}
