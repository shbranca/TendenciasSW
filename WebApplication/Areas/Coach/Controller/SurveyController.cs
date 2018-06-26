using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Controllers; 
using DAL.Models; 
using WebApplication.Constant;
using Microsoft.EntityFrameworkCore;
using WebApplication.Areas.Coach.ViewModels;
using WebApplication.Helpers;
using DAL;
using Microsoft.AspNetCore.Identity;

namespace WebApplication.Areas.Coach.Controller
{
    [Authorize(Roles = ConstantHelpers.ROLES.COACH)]
    [Area("Coach")]
    [Route("coach/encuestas")]
    public class SurveyController : BaseController
    {
        public SurveyController(ApiContext context, UserManager<ApplicationUser> userManager) : base(context, userManager) { }

        public IActionResult Index()
        {
            SurveyViewModel surveyViewModel = new SurveyViewModel();
            return View(surveyViewModel);
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

        [Route("registrar/post")]
        [HttpPost]
        public async Task<IActionResult> AddSurvey(SurveyViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
           // var cUser = await GetCurrentUserAsync();
            
            var userId = _userManager.GetUserId(User);
            //var userId2 = cUser?.Id;

            var creatorUser = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
            Survey s = new Survey
            {
                Name = model.Name,
                Description = model.Description,
                Code = model.Code,
                PublicationDate = ConvertHelpers.DatepickerToDatetime(model.PublicationDate),
                FinishDate = ConvertHelpers.DatepickerToDatetime(model.FinishDate),
                Creator = creatorUser
            };
            await _context.Surveys.AddAsync(s);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Route("editar/{id}")]
        public IActionResult Edit(Guid id) => View();

        [Route("get/{id}")]
        public async Task<IActionResult> GetSurvey(Guid id)
        {
            var result = await _context.Surveys.FirstOrDefaultAsync(x => x.Id == id);
            var survey = new SurveyViewModel()
            {
                Id = result.Id,
                Name = result.Name,
                Description = result.Description,
                Code = result.Code,
                PublicationDate = result.PublicationDate.ToString("dd/MM/yyyy"),
                FinishDate = result.FinishDate.ToString("dd/MM/yyyy")
            };
            return Ok(survey);
        }

        [HttpPost("editar/post")]
        public async Task<IActionResult> EditSurvey(SurveyViewModel model)
        {
            var s = await _context.Surveys.FindAsync(model.Id);
            s.Name = model.Name;
            s.Description = model.Description;
            s.Code = model.Code;
            s.PublicationDate = ConvertHelpers.DatepickerToDatetime(model.PublicationDate);
            s.FinishDate = ConvertHelpers.DatepickerToDatetime(model.FinishDate);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Route("eliminar")]
        [HttpPost]
        public async Task<IActionResult> Delete(Guid id)
        {
            var questions = await _context.Questions.Where(x => x.SurveyId == id).ToListAsync();
            for (var i = 0; i < questions.Count; i++)
            {
                var answers = await _context.Answers.Where(x => x.QuestionId == questions[i].Id).ToListAsync();
                for (var j = 0; j < answers.Count; j++)
                    _context.Answers.Remove(answers.ElementAt(j));
                await _context.SaveChangesAsync();
                _context.Questions.Remove(questions.ElementAt(i));
            }
            await _context.SaveChangesAsync();

            var s = await _context.Surveys.FindAsync(id);
            _context.Surveys.Remove(s);
            await _context.SaveChangesAsync();
            return Ok();
        }

        #region preguntas
        [Route("registrar/pregunta/post")]
        [HttpPost]
        public async Task<IActionResult> AddQuestion(QuestionViewModel model)
        {
            Question q;
            if (model.Id != Guid.Empty)
                q = _context.Questions.FirstOrDefault(x => x.Id == model.Id);
            else
                q = new Question();
            q.SurveyId = model.SurveyId;
            q.Description = model.Description;
            q.Type = model.Type;

            if (model.Id != Guid.Empty)
                _context.Questions.Update(q);
            else
                await _context.Questions.AddAsync(q);

            await _context.SaveChangesAsync();
            if (model.Answers != null)
                for (var i = 0; i < model.Answers.Count; i++)
                {
                    Answer a;
                    if (model.Answers[i].Id != Guid.Empty)
                        a = _context.Answers.FirstOrDefault(x => x.Id == model.Answers[i].Id);
                    else
                    {
                        a = new Answer
                        {
                            QuestionId = q.Id
                        };
                    }
                    a.Description = model.Answers[i].Description;

                    if (model.Answers[i].Id != Guid.Empty)
                        _context.Answers.Update(a);
                    else
                        await _context.Answers.AddAsync(a);
                    await _context.SaveChangesAsync();
                }
            return Ok();
        }

        [Route("preguntas/get/{id}")]
        public async Task<IActionResult> GetQuestions(Guid id)
        {
            var result = await _context.Questions.ToListAsync();
            var qs = new List<QuestionViewModel>();
            for (int i = 0; i < result.Count; i++)
            {
                if (result[i].SurveyId == id)
                {
                    var answers = await _context.Answers.Where(x => x.QuestionId == result[i].Id).ToListAsync();
                    var mylist = new List<AnswerViewModel>();
                    for (int j = 0; j < answers.Count; j++)
                    {
                        var answer = new AnswerViewModel()
                        {
                            Description = answers[j].Description,
                            Id = answers[j].Id,
                            QuestionId = answers[j].QuestionId
                        };
                        mylist.Add(answer);
                    }

                    var q = new QuestionViewModel()
                    {
                        Id = result[i].Id,
                        SurveyId = result[i].SurveyId,
                        Type = result[i].Type,
                        Description = result[i].Description,
                        Answers = mylist
                    };
                    qs.Add(q);
                }
            }
            return Ok(qs);
        }

        [Route("preguntas/eliminar")]
        [HttpPost]
        public async Task<IActionResult> DeleteQuestion(Guid id)
        {
            var answers = await _context.Answers.Where(x => x.QuestionId == id).ToListAsync();
            for (var i = 0; i < answers.Count(); i++)
            {
                _context.Answers.Remove(answers[i]);
            }
            await _context.SaveChangesAsync();
            Question q = await _context.Questions.FindAsync(id);
            _context.Questions.Remove(q);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Route("pregunta/get/{id}")]
        public async Task<IActionResult> GetQuestion(Guid id)
        {
            var q = await _context.Questions.FirstOrDefaultAsync(x => x.Id == id);
            var answers = await _context.Answers.Where(x => x.QuestionId == q.Id).ToListAsync();
            var mylist = new List<AnswerViewModel>();
            for (int j = 0; j < answers.Count; j++)
            {
                var answer = new AnswerViewModel()
                {
                    Description = answers[j].Description,
                    Id = answers[j].Id,
                    QuestionId = answers[j].QuestionId
                };
                mylist.Add(answer);
            }
            var viewModel = new QuestionViewModel()
            {
                Id = q.Id,
                Description = q.Description,
                Type = q.Type,
                SurveyId = q.SurveyId,
                Answers = mylist
            };
            return Ok(viewModel);
        }

    }
    #endregion
}