using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Answer
    {
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }

        [Required]
        public String Description { get; set; }
    }
}