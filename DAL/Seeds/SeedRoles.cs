using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Seeds
{
    public class SeedRoles
    {
        public SeedRoles(RoleManager<ApplicationRole> roleManager)
        {
          

            if (!roleManager.RoleExistsAsync("NormalUser").Result)
            {
                ApplicationRole role = new ApplicationRole();
                role.Name = "NormalUser";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("NormalAdmin").Result)
            {
                ApplicationRole role = new ApplicationRole();
                role.Name = "New Administrator";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
        }
    }
}
