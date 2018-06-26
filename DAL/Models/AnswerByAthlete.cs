using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class AnswerByAthlete
    {
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }
        public ApplicationUser Athlete { get; set; }
     
        public String Description { get; set; }
    }
}
