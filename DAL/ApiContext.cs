using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DAL
{
    public class ApiContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }

        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Question> Questions{ get; set; }
        public DbSet<Answer> Answers{ get; set; }
        public DbSet<AnswerByAthlete> AnswerByAthletes{ get; set; }
        public DbSet<EvolutionAthlete> EvolutionAthletes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var foreignKeys = modelBuilder.Model
               .GetEntityTypes()
               .SelectMany(t => t.GetForeignKeys())
               .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var foreignKey in foreignKeys)
            {
                foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
            }

            

            base.OnModelCreating(modelBuilder);
        }
    }
}
