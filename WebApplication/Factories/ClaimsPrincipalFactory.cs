using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options; 
using DAL.Models;

namespace WebApplication.Factories
{
    public class ClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser, ApplicationRole>
    {
        public ClaimsPrincipalFactory(
        UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager,
        IOptions<IdentityOptions> optionsAccessor) : base(userManager, roleManager, optionsAccessor)
        {
        }

        public override async Task<ClaimsPrincipal> CreateAsync(ApplicationUser user)
        {
            var principal = await base.CreateAsync(user);
            if (user.PaternalSurname != null && user.MaternalSurname != null && user.Email != null)
            {
                //Putting our Property to Claims
                ((ClaimsIdentity)principal.Identity).AddClaims(new[] {
                new Claim(ClaimTypes.UserData, user.Name + " " + user.PaternalSurname + " " + user.MaternalSurname),
                new Claim(ClaimTypes.Email, user.Email)
            });
            }
            else
            {
                ((ClaimsIdentity)principal.Identity).AddClaims(new[] {
                new Claim(ClaimTypes.UserData, user.Name),
                new Claim(ClaimTypes.Email, "lusho@gmail.com")
            });
            }

            return principal;
        }
    }
}
