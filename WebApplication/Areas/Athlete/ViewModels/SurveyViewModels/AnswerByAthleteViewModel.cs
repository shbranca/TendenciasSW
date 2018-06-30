using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Areas.Athlete.ViewModels.SurveyViewModels;

namespace WebApplication.Areas.Athlete.ViewModels.SurveyViewModels
{
    public class AnswerByAthleteViewModel
    {
        public Guid QuestionId { get; set; }
        public Guid AnswerId { get; set; }
        public string Description { get; set; }
    }
}
