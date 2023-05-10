using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private readonly UserService _userService;

        public UserProfileController(UserService userService)
        {
            this._userService = userService;
        }

        [HttpGet("{email}")]
        public IActionResult GetUserProfile(string email)
        {
            var user = _userService.GetUserByEmail(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }   
    }
}
