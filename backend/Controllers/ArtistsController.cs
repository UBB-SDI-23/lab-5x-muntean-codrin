using Azure;
using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using backend.Models.Request;
using backend.Models.Response;
using backend.Models.Statistics;
using backend.Services;
using backend.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArtistsController : Controller
    {
        private readonly ArtistsService _artistsService;
        private readonly IUriService _uriService;

        public ArtistsController(ArtistsService artistsService, IUriService uriService)
        {
            _artistsService = artistsService;
            _uriService = uriService;
        }

        [HttpGet()]
        public IActionResult GetArtistList([FromQuery] PaginationFilter filter, [FromQuery(Name = "year")] int? year)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            List<ArtistExtended> artists = new List<ArtistExtended>();
            int totalRecords;
            if (year.HasValue)
            {
                artists = _artistsService.GetAllAfterYear(filter, year.Value);
                totalRecords = _artistsService.GetArtistsCount(year.Value);
            }
            else
            {
                artists = _artistsService.GetAll(filter);
                totalRecords = _artistsService.GetArtistsCount();
            }
            
            var route = Request.Path.Value;
            var pagedReponse = PaginationHelper.CreatePagedReponse(artists, validFilter, totalRecords, _uriService, route);

            return Ok(pagedReponse);
        }

        [HttpGet("{id}")]
        public ActionResult<ArtistResponse> GetArtist(int id)
        {
            var artist = _artistsService.GetById(id);
            if(artist == null)
            {
                return NotFound();
            }
            return Ok(artist);
        }

        [HttpPost]
        [Authorize]
        public ActionResult<Artist> PostArtist([FromBody] NewArtistRequest request)
        {
            var email = User.FindFirstValue("Email");
            Artist artist = _artistsService.AddArtist(request, email);
            return Ok(artist);
        }

        [HttpPut("{id}")]

        public ActionResult<Artist> PutArtist(int id, [FromBody] NewArtistRequest request)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _artistsService.GetUserOfItem(id) == email))
                return Unauthorized();

            Artist artist = _artistsService.UpdateArtist(id, request);
            if (artist == null)
                return NotFound();
            return Ok(artist);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteArtist(int id)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _artistsService.GetUserOfItem(id) == email))
                return Unauthorized();

            var deleted = _artistsService.DeleteArtist(id);
            if(deleted)
                return Ok();
            return NotFound();
        }

        [HttpPost("BulkAdd")]
        [Authorize]
        public ActionResult<List<Artist>> BulkPostArtist([FromBody] List<NewArtistRequest> requests)
        {
            List<Artist> artist = _artistsService.AddArtists(requests);
            return Ok(artist);
        }

        [HttpPost("BulkDelete")]
        [Authorize(Roles ="Admin")]
        public ActionResult<bool> BulkDeleteArtist([FromBody] List<int> ids)
        {
            bool result = _artistsService.DeleteArtists(ids);
            return Ok(result);
        }

        [HttpGet("Songs")]
        public ActionResult<List<ArtistSongs>> GetArtistsSongs([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            List<ArtistSongs> artistsSongs = new List<ArtistSongs>();

            artistsSongs = _artistsService.GetArtistsSongs(filter);
            if (artistsSongs == null)
                return NotFound();

            var totalRecords = _artistsService.GetArtistsCount();
            var route = Request.Path.Value;
            var pagedReponse = PaginationHelper.CreatePagedReponse(artistsSongs, validFilter, totalRecords, _uriService, route);

            return Ok(pagedReponse);

        }
    }
}
