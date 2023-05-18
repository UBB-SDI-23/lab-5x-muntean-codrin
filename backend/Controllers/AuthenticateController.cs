using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticateController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly UserService _userService;

        public AuthenticateController(UserManager<User> userManager, UserService userService)
        {
            _userManager = userManager;
            _userService = userService;

        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = from state in ModelState.Values
                             from error in state.Errors
                             select error.ErrorMessage;
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(errors.ToList()));
            }

            var passwordValidator = HttpContext.RequestServices.GetService<IPasswordValidator<User>>();

            var user = new User { UserName = model.Email, Email = model.Email };

            var result = await passwordValidator.ValidateAsync(_userManager, user, model.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return StatusCode(StatusCodes.Status500InternalServerError, errors.ToList());
            }


            var userExists = await _userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new string[] { "Users with this emal exists already" });
            user = new()
            {
                Email = model.Email!,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Email,
                FirstName = model.FirstName!,
                LastName = model.LastName!,
                DateOfBirth = model.DateOfBirth,
                Gender = model.Gender!,
                City = model.City!,
                ConfirmationCode = Guid.NewGuid().ToString(),
                ConfirmationCodeExpiration = DateTime.Now.AddMinutes(10)
            };

            result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new string[] { "Couldn't create account." });

            return Ok(user.ConfirmationCode);
        }

        [HttpGet]
        [Route("register/confirm/{confirmationCode}")]
        public async Task<IActionResult> ConfirmRegistration(string confirmationCode)
        {
            var user = _userService.FindByConfirmationCodeAsync(confirmationCode);

            if (user == null)
                return NotFound(new string[] { "Invalid confirmation code." });

            if (DateTime.Now > user.ConfirmationCodeExpiration)
                return Unauthorized(new string[] { "Confirmation code has expired." });

            user.EmailConfirmed = true;
            user.ConfirmationCode = null;
            user.ConfirmationCodeExpiration = null;
            await _userManager.UpdateAsync(user);

            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = from state in ModelState.Values
                             from error in state.Errors
                             select error.ErrorMessage;

                return StatusCode(StatusCodes.Status500InternalServerError, errors.ToList());

            }

            var user = await _userManager.FindByNameAsync(model.Email);
    
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                if (user.EmailConfirmed == false)
                    return Unauthorized(new string[] { "Email is not confirmed." });

                var token = await _userService.GenerateJwt(user);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    role = await _userManager.GetRolesAsync(user)
                });
            }
            return Unauthorized(new string[] {"Cannot verify user login info."});
        }


        [HttpGet]
        [Route("test")]
        public IActionResult Get()
        {
            string a = "";
            a+=("\nUser Id: " + User.FindFirstValue("Email"));
            a+=("\nFirst name: " + User.FindFirstValue("FirstName"));
            a+=("\nLast name: " + User.FindFirstValue("LastName"));
            a += ("\nRole: " + User.FindFirstValue(ClaimTypes.Role));

            return Ok(a);
        }
    }
}
