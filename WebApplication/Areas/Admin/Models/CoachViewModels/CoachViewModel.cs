using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Areas.Admin.Models.CoachViewModels
{
    public class CoachViewModel
    {
        public string Id { get; set; }
        public CoachFieldsViewModel Fields { get; set; }
    }
}
