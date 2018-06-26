using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Seeds
{
    public class ApplicationRoleSeed
    {
        public static ApplicationRole[] Seed()
        {
            var result = new ApplicationRole[]
            {
                new ApplicationRole { Name = "Superadmin", NormalizedName="SUPERADMIN" },
                new ApplicationRole { Name = "Coach" , NormalizedName="COACH"},
                new ApplicationRole { Name = "Athlete", NormalizedName="ATHLETE" }
            };
            return result;
        }
    }
}
