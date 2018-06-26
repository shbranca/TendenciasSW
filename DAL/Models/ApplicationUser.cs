using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using WebApplication.ModelActions;

namespace DAL.Models
{
    public class ApplicationUser : IdentityUserSoftDelete
    {
        [Required]
        public string Name { get; set; }
        public string PaternalSurname { get; set; }
        public string MaternalSurname { get; set; }
        
        [NotMapped]
        public string RawFullName => $"{Name} {PaternalSurname} {MaternalSurname}";

        [NotMapped]
        public string FullName => $"{PaternalSurname} {MaternalSurname}, {Name}";

        public string Dni { get; set; }
    }
}
