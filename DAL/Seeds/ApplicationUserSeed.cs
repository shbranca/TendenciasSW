using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Seeds
{
    public class ApplicationUserSeed
    {
        public static ApplicationUser[] Seed()
        {
           
            var result = new ApplicationUser[]
               {
                new ApplicationUser {Name = "Superadmin", UserName = "superadmin", Dni = "71252283" },
                new ApplicationUser {Name = "Coach Lusho", UserName = "coach", Dni = "71252284" },
                new ApplicationUser {Name = "Atleta Lusho", UserName = "atleta", Dni = "71252285" }
               };


            return result;
        }
    }
}
