using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public class ApiContextFactory : IDesignTimeDbContextFactory<ApiContext>
    {
        public ApiContextFactory()
        {
        } 
        public ApiContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ApiContext>();
            builder.UseSqlServer(
               "Server=localhost;Database=WebLusho;Trusted_Connection=True;MultipleActiveResultSets=true"
               //"Server=tcp:bwr9tqktu5.database.windows.net,1433;Initial Catalog=UNICA.INTRANET.DB;Persist Security Info=False;User ID=em3;Password=Enchufate2015;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
               );

            return new ApiContext(builder.Options);
        }
    }
}
