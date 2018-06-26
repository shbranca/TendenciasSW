using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Survey
    {
        public Guid Id { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(50)")]
        public string Name { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(50)")]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(10)")]
        public string Code { get; set; }

        public DateTime PublicationDate { get; set; }

        public DateTime FinishDate { get; set; }

        public ICollection<Question> Questions { get; set; }

        public ApplicationUser Creator { get; set; }

    }
}
