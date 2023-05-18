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
    public class TracksController : Controller
    {
        private readonly TracksService _tracksService;
        private readonly IUriService _uriService;

        public TracksController(TracksService tracksService, IUriService uriService)
        {
            _tracksService = tracksService;
            _uriService = uriService;
        }

        [HttpGet()]
        public IActionResult GetTracksList([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            List<TrackExtended> tracks = _tracksService.GetAll(filter);

            var totalRecords = _tracksService.GetTracksCount();
            var route = Request.Path.Value;
            var pagedReponse = PaginationHelper.CreatePagedReponse(tracks, validFilter, totalRecords, _uriService, route);
            return Ok(pagedReponse);
        }

        [HttpGet("{id}")]
        public ActionResult<Track> GetTrack(int id)
        {
            var track = _tracksService.GetById(id);
            if (track == null)
            {
                return NotFound();
            }
            return Ok(track);
        }

        [HttpPost()]
        [Authorize]
        public ActionResult<Track> PostTrack([FromBody] NewTrackRequest request)
        {
            var email = User.FindFirstValue("Email");
            var track = _tracksService.AddTrack(request, email);
            if (track == null)
                return NotFound();
            return Ok(track);
        }


        [HttpPut("{id}")]
        public ActionResult<Track> PutTrack(int id, [FromBody] NewTrackRequest request)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _tracksService.GetUserOfItem(id) == email))
                return Unauthorized();


            var track = _tracksService.UpdateTrack(id, request);
            if (track == null)
                return NotFound();
            return Ok(track);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTrack(int id)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _tracksService.GetUserOfItem(id) == email))
                return Unauthorized();

            var deleted = _tracksService.DeleteTrack(id);
            if (deleted == false)
                return NotFound();
            return Ok();
        }

    }
}
