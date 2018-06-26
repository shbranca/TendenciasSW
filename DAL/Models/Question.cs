using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class Question
    {
        public Guid Id { get; set; }
        public Guid SurveyId { get; set; }

        [Required]
        public int Type { get; set; }

        [Required]
        public String Description { get; set; }
        public ICollection<Answer> Answers { get; set; }

    }
}
