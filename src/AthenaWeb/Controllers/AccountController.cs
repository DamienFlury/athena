using System;
using System.Linq;
using System.Threading.Tasks;
using AthenaWeb.Data;
using AthenaWeb.Data.Entities;
using AthenaWeb.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AthenaWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ExamContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(ExamContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result != IdentityResult.Success) return BadRequest(result.Errors);


            return Created("User created", new { user.Email });
        }
    }
}