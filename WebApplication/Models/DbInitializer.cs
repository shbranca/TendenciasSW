using DAL;
using DAL.Models;
using DAL.Seeds;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Threading.Tasks; 
namespace WebApplication.Models
{
    public class DbInitializer
    {
        public static async Task InitializeAsync(ApiContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, IServiceProvider serviceProvider)
        {
             Assembly dalAssembly = null;
             var assemblies = AppDomain.CurrentDomain.GetAssemblies();
             //Loops through all the found assemblies and stores the NET.UNICA.EDU.DAL assembly
             foreach (var assembly in assemblies)
             {
                 var assemblyName = assembly.GetName();

                 if (assemblyName.Name == "DAL")
                 {
                     dalAssembly = assembly;
                     break;
                 }
             }

             //Checks if the global assembly exists
             if (dalAssembly == null)
             {
                 var exception = new ApplicationException($"Assembly not found");
                 throw exception;
             }

             //Declares the dictionaries to store the types of the NET.UNICA.EDU.DAL.Models and NET.UNICA.EDU.DAL.Seeds namespaces and gets all the types from the global assembly
             Dictionary<string, Type> modelsTypes = new Dictionary<string, Type>();
             Dictionary<string, Type> seedsTypes = new Dictionary<string, Type>();
             var dalAssemblyTypes = dalAssembly.GetTypes();

             //Loops through all the assembly types and stores the type if the namespace is either NET.UNICA.EDU.DAL.Models or NET.UNICA.EDU.DAL.Seeds
             foreach (Type dalAssemblyType in dalAssemblyTypes)
             {
                 if (
                     dalAssemblyType.IsDefined(typeof(CompilerGeneratedAttribute), false) ||
                     dalAssemblyType.Namespace == null ||
                     dalAssemblyType.Name == "<>c"
                 )
                 {
                     continue;
                 }

                 if (dalAssemblyType.Namespace == "DAL.Models")
                 {
                     modelsTypes.Add(dalAssemblyType.Name, dalAssemblyType);
                 }
                 else if (dalAssemblyType.Namespace == "DAL.Seeds")
                 {
                     seedsTypes.Add(dalAssemblyType.Name, dalAssemblyType);
                 }
             }
              

            context.Database.EnsureCreated();


            /*   if (!context.Users.Any())
               {
                   context.Users.AddRange(ApplicationUserSeed.Seed(context,userManager));
                   context.SaveChanges();
               }



               var Password = "Lusho";
               foreach(var user in context.Users)
               {
                  // var identityResult = await userManager.CreateAsync(user);
                 //  await userManager.AddPasswordAsync(user, Password);

                  user.PasswordHash = userManager.PasswordHasher.HashPassword(user, "Lusho");
               }
               context.SaveChanges();
               context.SaveChanges();*/

            var users = ApplicationUserSeed.Seed();
            foreach (var user in users)
            {

                var identityResult = await userManager.CreateAsync(user,"Lusho");
                /*
                if (identityResult.Succeeded)
                {
                  
                    identityResult = await userManager.AddPasswordAsync(user, "Lusho");
                }*/
            }
            context.SaveChanges();
            if (!context.Roles.Any())
            {
                context.Roles.AddRange(ApplicationRoleSeed.Seed());
                context.SaveChanges();
            }

            SeedRoles newSeed = new SeedRoles(roleManager);

            if (!context.UserRoles.Any())
            {
                context.UserRoles.AddRange(ApplicationUserRoleSeed.Seed(context));
                context.SaveChanges();
            }
          
            /*
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            string[] roleNames = { "Admin", "Member" };
            IdentityResult roleResult;
            foreach(var roleName in roleNames)
            {
                var roleExist = await RoleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    roleResult = await RoleManager.CreateAsync(new IdentityRole(roleName));
                }
            }*/
        }
    }
}
