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
using WebApplication.Areas.Admin.Models.CoachViewModels;
using WebApplication.Constant;
using WebApplication.Controllers;

namespace WebApplication.Areas.Admin.Controllers
{
    [Authorize]
    [Area("Admin")]
    [Route("admin/coaches")]
    public class CoachController : BaseController
    {
        public CoachController(ApiContext context, UserManager<ApplicationUser> userManager) : base(context, userManager) { }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }


        [Route("get")]
        public async Task<IActionResult> GetCoaches()
        {

            var result = from r in _context.Roles
                         join ur in _context.UserRoles on r.Id equals ur.RoleId
                         join u in _context.Users on ur.UserId equals u.Id
                         where r.Name == ConstantHelpers.ROLES.COACH
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

        [Route("agregar")]
        public IActionResult Add()
        {
            CoachViewModel coachViewModel = new CoachViewModel();
            return View(coachViewModel);
        }
        [Route("agregar")]
        [HttpPost]
        public async Task<IActionResult> Add(CoachViewModel model)
        {
            try
            {

                if (!ModelState.IsValid)
                    return BadRequest(model);

                if (_context.Users.Any(x => x.UserName.Equals(model.Fields.UserName)))
                    return BadRequest("El usuario especificado ya se encuentra registrado.");

                if (_context.Users.Any(x => x.Email.Equals(model.Fields.Email)))
                    return BadRequest("El correo electrónico especificado ya se encuentra registrado.");

                var passwordValidator = new PasswordValidator<ApplicationUser>();
                var passwordIsValid = passwordValidator.ValidateAsync(_userManager, new ApplicationUser(), model.Fields.Password).Result.Succeeded;
                if (!passwordIsValid)
                    return BadRequest("La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula, 1 dígito y un caracter no alfanumérico.");

                var user = new ApplicationUser();
                FillApplicationUser(ref user, model.Fields);
                var identityResult = await _userManager.CreateAsync(user, model.Fields.Password);

                if (!identityResult.Succeeded)
                    return BadRequest("Ocurrió un problema al registrar.");


                var identityRoleResult = await _userManager.AddToRoleAsync(user, ConstantHelpers.ROLES.COACH);
                //var identityResultRole = await _userManager.AddToRoleAsync(user, new IdentityRole(ConstantHelpers.ROLES.ATHLETE));

                if (!identityRoleResult.Succeeded)
                    return BadRequest("Ocurrió un problema al registrar.");


                await _context.Users.AddAsync(user);
                return Ok();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void FillApplicationUser(ref ApplicationUser user, CoachFieldsViewModel model)
        {
            user.Name = model.Name;
            user.PaternalSurname = model.PaternalSurname;
            user.MaternalSurname = model.MaternalSurname;
            user.Email = model.Email;
            user.UserName = model.UserName;
            user.PhoneNumber = model.PhoneNumber;
        }


        [Route("editar/{id}")]
        public async Task<IActionResult> Edit(string id)
        {
            try
            {
                if (id.Equals(Guid.Empty))
                    throw new ApplicationException($"No se pudo encontrar el usuario con el id {id}.");

                ApplicationUser user = await _context.Users.FindAsync(id);

                CoachViewModel model = new CoachViewModel()
                {
                    Id = user.Id,
                    Fields = new CoachFieldsViewModel()
                    {
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        UserName = user.UserName,
                        PaternalSurname = user.PaternalSurname,
                        MaternalSurname = user.MaternalSurname,
                        Name = user.Name
                    }
                };

                return View(model);
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        [Route("editar/{id}")]
        [HttpPost]
        public async Task<IActionResult> Edit(CoachViewModel model, Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(model);

            var validateUserName = await _context.Users.FirstOrDefaultAsync(x => x.UserName.Equals(model.Fields.UserName) && !x.Id.Equals(model.Id));
            if (validateUserName != null)
                return BadRequest("El usuario especificado ya se encuentra registrado.");

            var validateEmail = await _context.Users.FirstOrDefaultAsync(x => x.Email.Equals(model.Fields.Email) && !x.Id.Equals(model.Id));
            if (validateEmail != null)
                return BadRequest("El correo electrónico especificado ya se encuentra registrado.");

            var passwordValidator = new PasswordValidator<ApplicationUser>();
            var passwordIsValid = passwordValidator.ValidateAsync(_userManager, new ApplicationUser(), model.Fields.Password).Result.Succeeded;
            if (!passwordIsValid)
                return BadRequest("La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula, 1 dígito y un caracter no alfanumérico.");

            if (!ModelState.IsValid)
                return BadRequest(model);

            var user = await _context.Users.FindAsync(model.Id);

            FillApplicationUser(ref user, model.Fields);

            var identityResult = await _userManager.UpdateAsync(user);
            if (!identityResult.Succeeded)
                return BadRequest("Ocurrió un problema al registrar.");

            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, model.Fields.Password);
            _context.SaveChanges(); 
            return Ok();
        }
    }
}