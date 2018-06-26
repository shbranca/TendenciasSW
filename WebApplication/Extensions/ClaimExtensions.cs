using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApplication.Extensions
{
    public static class ClaimExtensions
    {
        public static string GetFullName(this ClaimsPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                return user.Claims.FirstOrDefault(v => v.Type == ClaimTypes.UserData).Value;
            }
            return "";
        }

        public static string GetEmail(this ClaimsPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                return user.Claims.FirstOrDefault(v => v.Type == ClaimTypes.Email).Value;
            }
            return "";
        }
        public static string GetPhone(this ClaimsPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                return user.Claims.FirstOrDefault(v => v.Type == ClaimTypes.HomePhone).Value;
            }
            return "";
        }
    }
}
