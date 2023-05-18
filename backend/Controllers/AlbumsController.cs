using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using backend.Models.Request;
using backend.Models.Response;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlbumsController : Controller
    {
        private readonly AlbumsService _albumService;
        private readonly IUriService _uriService;

        public AlbumsController(AlbumsService albumService, IUriService uriService)
        {
            _albumService = albumService;
            _uriService = uriService;
        }

        [HttpGet()]
        public IActionResult GetAlbumsList([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            List<AlbumExtended> albums = _albumService.GetAll(filter);
            
            var totalRecords = _albumService.GetAlbumsCount();
            var route = Request.Path.Value;
            var pagedReponse = PaginationHelper.CreatePagedReponse(albums, validFilter, totalRecords, _uriService, route);

            return Ok(pagedReponse);
        }


        [HttpGet("{id}")]
        public ActionResult<Album> GetAlbum(int id)
        {
            var album = _albumService.GetById(id);
            if (album == null)
            {
                return NotFound();
            }
            return Ok(album);
        }

        [HttpPost()]
        [Authorize]
        public ActionResult<Album> PostAlbum([FromBody] NewAlbumRequest request)
        {
            var email = User.FindFirstValue("Email");
            var album = _albumService.AddAlbum(request, email);
            if (album == null)
                return NotFound();
            return Ok(album);
        }

        [HttpPut("{id}")]
        public ActionResult<Album> PutAlbum(int id, [FromBody] NewAlbumRequest request)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _albumService.GetUserOfItem(id) == email))
                return Unauthorized();

            var album = _albumService.UpdateAlbum(id, request);
            if (album == null)
                return NotFound();
            return Ok(album);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteAlbum(int id)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _albumService.GetUserOfItem(id) == email))
                return Unauthorized();

            var deleted = _albumService.DeleteAlbum(id);
            if (deleted == false)
                return NotFound();
            return Ok();
        }

        [HttpPost("BulkDelete")]
        [Authorize(Roles = "Admin")]
        public ActionResult<bool> BulkDeleteAlbums([FromBody] List<int> ids)
        {
            bool result = _albumService.DeleteAlbums(ids);
            return Ok(result);
        }
    }
}
