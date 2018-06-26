using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Seeds
{
    public class ApplicationUserRoleSeed
    {
        public static ApplicationUserRole[] Seed(ApiContext context)
        {
            var roles = context.Roles.ToArray();
            var users = context.Users.ToArray();

            var result = new ApplicationUserRole[]
            {
                new ApplicationUserRole { RoleId = roles.FirstOrDefault(x => x.Name == "Superadmin").Id, UserId = users.FirstOrDefault(x=>x.UserName =="superadmin").Id},
                new ApplicationUserRole { RoleId = roles.FirstOrDefault(x => x.Name == "Coach").Id, UserId = users.FirstOrDefault(x=>x.UserName =="coach").Id},
                new ApplicationUserRole { RoleId = roles.FirstOrDefault(x => x.Name == "Athlete").Id, UserId = users.FirstOrDefault(x=>x.UserName =="atleta").Id }
            };
            return result;
        }
    }
}
