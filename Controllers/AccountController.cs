using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using RoomBooking.Models;

namespace RoomBooking.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class AccountController : Controller
  {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ILogger _logger;
    private readonly IConfiguration _config;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ILogger<AccountController> logger,
        IConfiguration config)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _logger = logger;
      _config = config;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginViewModel inUser)
    {
      var result = await _signInManager.PasswordSignInAsync(inUser.Email, inUser.Password, true, false);
      if (result.Succeeded)
      {
        return await GenerateToken(inUser);
      }
      else
      {
        return BadRequest();
      }
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel inUser)
    {
      var user = new ApplicationUser { UserName = inUser.Email, Email = inUser.Email };
      var result = await _userManager.CreateAsync(user, inUser.Password);
      if (result.Succeeded)
      {
        return Ok();
      }
      return BadRequest();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
      await _signInManager.SignOutAsync();
      return Ok();
    }

    [HttpPost("generateToken")]
    [AllowAnonymous]
    public async Task<IActionResult> GenerateToken([FromBody] LoginViewModel inUser)
    {
      if (ModelState.IsValid)
      {
        var user = await _userManager.FindByEmailAsync(inUser.Email);

        if (user != null)
        {
          var result = await _signInManager.CheckPasswordSignInAsync(user, inUser.Password, false);
          if (result.Succeeded)
          {

            var claims = new[]
            {
              new Claim(JwtRegisteredClaimNames.Sub, user.Email),
              new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Tokens:Issuer"],
              _config["Tokens:Issuer"],
              claims,
              expires: DateTime.Now.AddDays(30),
              signingCredentials: creds);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
          }
        }
      }

      return BadRequest("Could not create token");
    }
  }
}