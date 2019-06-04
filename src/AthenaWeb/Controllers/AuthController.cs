using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AthenaWeb.Data.Entities;
using AthenaWeb.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AthenaWeb.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase {
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthController (SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IConfiguration configuration) =>
      (_signInManager, _userManager, _configuration) = (signInManager, userManager, configuration);

    [HttpPost]
    public async Task<IActionResult> CreateToken ([FromBody] UserDto creds) {
      if (!ModelState.IsValid) return BadRequest ();

      var user = await _userManager.FindByEmailAsync (creds.Email);

      if (user is null) return Unauthorized ($"Email {creds.Email} doesn't exist");

      var result = await _signInManager.CheckPasswordSignInAsync (user, creds.Password, false);

      if (!result.Succeeded) return Unauthorized ("Wrong Password");

      var claims = new [] {
        new Claim (JwtRegisteredClaimNames.Sub, user.Email),
        new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid ().ToString ()),
        new Claim (JwtRegisteredClaimNames.UniqueName, user.Email)
      };
      var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (_configuration["Tokens:Key"]));
      var cred = new SigningCredentials (key, SecurityAlgorithms.HmacSha256);
      var token = new JwtSecurityToken (
        _configuration["Tokens:Issuer"],
        _configuration["Tokens:Audience"],
        claims,
        expires : DateTime.UtcNow.AddMinutes (30),
        signingCredentials : cred);

      var results = new {
        Token = new JwtSecurityTokenHandler ().WriteToken (token),
        expires = token.ValidTo
      };

      return Created ("", results);
    }
  }
}