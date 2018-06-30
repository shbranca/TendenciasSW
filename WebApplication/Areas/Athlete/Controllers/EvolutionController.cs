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
using WebApplication.Areas.Athlete.ViewModels.EvolutionViewModels;
using WebApplication.Controllers;

namespace WebApplication.Areas.Athlete.Controllers
{
    [Authorize(Roles = Constant.ConstantHelpers.ROLES.ATHLETE)]
    [Area("Athlete")]
    [Route("atleta/evolucion")]
    public class EvolutionController : BaseController
    {
        public EvolutionController(ApiContext context, UserManager<ApplicationUser> userManager) : base(context, userManager) { }

        [Route("getevolutions")]
        public async Task<IActionResult> GetEvolutionAthlete()
        {
            var userId = _userManager.GetUserId(User);
            var evolutions = await _context.EvolutionAthletes.Where(x => x.Athlete.Id == userId && x.DeletedAt == null)
                .Select(x => new EvolutionViewModel
                {
                    FiftyMeters = x.FiftyMeters,
                    OneHundredMeters = x.OneHundredMeters,
                    FourHundredMeters = x.FourHundredMeters,
                    CreatedAt = String.Format("{0:dd/MM/yyyy}", x.CreatedAt)
                })               
                .ToListAsync();
            return Ok(evolutions);
        }

        public IActionResult Index()
        {
            return View();
        }

    }
}