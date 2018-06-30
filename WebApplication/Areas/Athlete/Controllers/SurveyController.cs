using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using WebApplication.Areas.Athlete.ViewModels;
using WebApplication.Areas.Athlete.ViewModels.SurveyViewModels;
using WebApplication.Constant;
using WebApplication.Controllers;

namespace WebApplication.Areas.Athlete.Controllers
{
    [Authorize(Roles = ConstantHelpers.ROLES.ATHLETE)]
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
        [Route("responder/{id}")]
        public IActionResult RespondsSurvey(Guid id)
        {
            var questions = new List<QuestionViewModel>();
            var result = _context.Questions.Where(x => x.SurveyId == id).ToList();
            foreach(var question in result)
            {
                var questionViewModel = new QuestionViewModel()
                {
                    Id = question.Id,
                    Type = question.Type,
                    Description = question.Description,
                };
                questions.Add(questionViewModel);
            }
            
            
            foreach (var question in questions)
            {
                var answersViewModel = new List<AnswerViewModel>();
                var answers = _context.Answers.Where(x => x.QuestionId == question.Id).ToList();
                foreach(var answer in answers)
                {
                    var answerViewModel = new AnswerViewModel()
                    {
                        Id = answer.Id,
                        Description = answer.Description
                    };
                    answersViewModel.Add(answerViewModel);
                }
                question.Answers = answersViewModel;
            }
            ViewBag.Lusho = id;
            return View(questions);
        }

        
        [HttpPost]
        [Route("agregar-respuesta")]    
        public async Task<IActionResult> AddResponse(List<AnswerByAthleteViewModel> model, Guid SurveyId)
        {
            var userId = _userManager.GetUserId(User);
            var user = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
             
            var surveyResponsed = await _context.AnswerByAthletes.Where(x => x.Athlete.Id == user.Id && x.SurveyId == SurveyId).FirstOrDefaultAsync();
            if (surveyResponsed == null)
            { 
                List<AnswerByAthlete> answerByAthletes = new List<AnswerByAthlete>();
                foreach (var item in model)
                {
                    AnswerByAthlete answerByAthlete = new AnswerByAthlete();
                    answerByAthlete.Athlete = user;
                    answerByAthlete.SurveyId = SurveyId;
                    if (item.Description != null)
                    {
                        answerByAthlete.Description = item.Description;
                        answerByAthlete.QuestionId = item.QuestionId;
                    }
                    else
                    {
                        answerByAthlete.QuestionId = item.QuestionId;
                        answerByAthlete.AnswerId = item.AnswerId;
                    }
                    answerByAthletes.Add(answerByAthlete);
                }
                await _context.AnswerByAthletes.AddRangeAsync(answerByAthletes);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

    }
}