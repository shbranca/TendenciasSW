using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Areas.Coach.ViewModels.AthleteViewModels;
using WebApplication.Constant;
using WebApplication.Controllers;

namespace WebApplication.Areas.Coach.Controller
{
    [Authorize(Roles = Constant.ConstantHelpers.ROLES.COACH)]
    [Area("Coach")]
    [Route("coach/atletas")]
    public class AthleteController : BaseController
    {
        public AthleteController(ApiContext context, UserManager<ApplicationUser> userManager) : base(context, userManager) { }

        [Route("get")]
        public async Task<IActionResult> GetAthletes()
        {
            var result = from r in _context.Roles
                         join ur in _context.UserRoles on r.Id equals ur.RoleId
                         join u in _context.Users on ur.UserId equals u.Id
                         where r.Name == ConstantHelpers.ROLES.ATHLETE
                         select new
                         {
                             id = u.Id,
                             names = u.Name,
                             paternalSurname = u.PaternalSurname,
                             maternalSurname = u.MaternalSurname,
                             userName = u.UserName,
                             email = u.Email,
                             phoneNumber = u.PhoneNumber
                         };
            return Ok(result);
        }

        public IActionResult Index()
        {
            return View();
        }

        [Route("atleta/{id}")]
        public IActionResult Athlete(string id)
        {
            var athlete = _context.Users.Where(x => x.Id == id).Select(
              x => new EvolutionAthleteViewModel
              {
                  AthleteId = x.Id,
                  Name = x.FullName
              }).FirstOrDefault();

            return View(athlete);
        }
        [Route("atleta/getevolutions/{id}")]
        public async Task<IActionResult> GetEvolutionAthlete(string id)
        {
            var evolutions = await _context.EvolutionAthletes.Where(x => x.Athlete.Id == id && x.DeletedAt == null).ToListAsync();

            return Ok(evolutions);
        }

        [Route("atleta/getevolution/{id}")]
        public async Task<IActionResult> GetEvolution(Guid id)
        {
            var evolution = await _context.EvolutionAthletes.Where(x => x.Id == id).FirstOrDefaultAsync();
            return Ok(evolution);
        } 

        [Route("crear/post")]
        [HttpPost]
        public async Task<IActionResult> AddEvolution(EvolutionAthleteViewModel model)
        {
            var athlete = await _context.Users.Where(x => x.Id == model.AthleteId).FirstOrDefaultAsync();
            EvolutionAthlete evolutionAthlete = new EvolutionAthlete
            {
                Athlete = athlete,
                FiftyMeters = model.FiftyMeters,
                OneHundredMeters = model.OneHundredMeters,
                FourHundredMeters = model.FourHundredMeters,
                CreatedAt = DateTime.Now
            };
            await _context.EvolutionAthletes.AddAsync(evolutionAthlete);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [Route("editar")]
        [HttpPost]
        public async Task<IActionResult> UpdateEvolution(EvolutionAthleteViewModel model)
        {
            var evolutionAny = true;
            if (model.Id != null)
            {
                evolutionAny = await _context.EvolutionAthletes.AnyAsync(x => x.Id == model.Id);
            }
            if (evolutionAny)
            {
                var evolution = await _context.EvolutionAthletes.FindAsync(model.Id);
                evolution.FiftyMeters= model.FiftyMeters;
                evolution.OneHundredMeters= model.OneHundredMeters;
                evolution.FourHundredMeters = model.FourHundredMeters;
                evolution.UpdatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("atleta/eliminar/post")]
        public async Task<IActionResult> DeleteEvolution(Guid id)
        {
            var evolution = await _context.EvolutionAthletes.Where(x => x.Id == id).FirstOrDefaultAsync();
            evolution.DeletedAt = DateTime.Now;
            _context.SaveChanges();
            return Ok();
        }
    }
}