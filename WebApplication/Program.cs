using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApplication.Constant;
using WebApplication.Models;
using WebApplication.ViewModels;

namespace WebApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);
            if (ConstantHelpers.SEEDS.ENABLED)
            {
                using (var scope = host.Services.CreateScope())
                {
                    var serviceProvider = scope.ServiceProvider;
                    try
                    {
                        var context = serviceProvider.GetRequiredService<ApiContext>();
                        //var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
                        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                        var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

                        DbInitializer.InitializeAsync(context, userManager, roleManager, serviceProvider).Wait();

                    }
                    catch (Exception ex)
                    {
                        var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                        logger.LogError(ex, "Error");
                    }
                }
            }
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
