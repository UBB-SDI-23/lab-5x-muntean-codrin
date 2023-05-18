using backend.Helpers;
using backend.Models.Extended;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private readonly UserService _userService;

        private readonly IUriService _uriService;

        public UserProfileController(UserService userService, IUriService uriService)
        {
            _userService = userService;
            _uriService = uriService;
        }
        [HttpGet()]
        [Authorize(Roles = "Admin")]
        public IActionResult GetUsers([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            List<UserExtended> users = _userService.GetAll(filter);

            var totalRecords = _userService.GetUserCount();
            var route = Request.Path.Value;
            var pagedReponse = PaginationHelper.CreatePagedReponse(users, validFilter, totalRecords, _uriService, route);
            return Ok(pagedReponse);
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

        [HttpPost("role")]
        public async Task<IActionResult> SetUserRole(string user, string role)
        {
            if (await _userService.UpdateUserRole(user, role))
                return Ok();
            return BadRequest();
        }
    }
}
