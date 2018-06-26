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
using WebApplication.Areas.Athlete.ViewModels;
using WebApplication.Constant;
using WebApplication.Controllers;

namespace WebApplication.Areas.Athlete.Controllers
{
    [Authorize(Roles = ConstantHelpers.ROLES.COACH)]
    [Area("Athlete")]
    [Route("atleta/encuestas")]
    public class SurveyController : BaseController
    {
        public SurveyController(ApiContext context, UserManager<ApplicationUser> userManager) : base(context, userManager) { }

        public IActionResult Index()
        {
            return View();
        }

        [Route("get")]
        public async Task<IActionResult> GetSurvies()
        {
            var result = await _context.Surveys.ToListAsync();

            var survies = new List<SurveyViewModel>();
            for (int i = 0; i < result.Count; i++)
            {
                var survey = new SurveyViewModel()
                {
                    Id = result[i].Id,
                    Name = result[i].Name,
                    Description = result[i].Description,
                    Code = result[i].Code,
                    PublicationDate = result[i].PublicationDate.ToString("dd/MM/yyyy"),
                    FinishDate = result[i].FinishDate.ToString("dd/MM/yyyy")
                };
                survies.Add(survey);
            }
            return Ok(survies);
        }

        public IActionResult RespondSurvey()
        {
            return View();
        }
    }
}