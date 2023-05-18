using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using backend.Models.Request;
using backend.Models.Response;
using backend.Models.Statistics;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaylistsController : Controller
    {
        private readonly PlaylistsService _playlistService;
        private readonly IUriService _uriService;

        public PlaylistsController(PlaylistsService playlistService, IUriService uriService)
        {
            _playlistService = playlistService;
            _uriService = uriService;
        }

        [HttpGet]
        public IActionResult GetPlaylistsList([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            List<PlaylistExtended> playlists = _playlistService.GetAll(filter);

            var totalRecords = _playlistService.GetPlaylistsCount();
            var route = Request.Path.Value;
            var pagedReponse = PaginationHelper.CreatePagedReponse(playlists, validFilter, totalRecords, _uriService, route);

            return Ok(pagedReponse);
        }

        [HttpGet("{id}")]
        public ActionResult<PlaylistResponse> GetPlaylist(int id)
        {
            var playlist = _playlistService.GetById(id);
            if (playlist == null)
            {
                return NotFound();
            }
            return Ok(playlist);
        }

        [HttpPost]
        [Authorize]
        public ActionResult<Playlist> PostPlaylist([FromBody] NewPlaylistRequest request)
        {
            var email = User.FindFirstValue("Email");
            Playlist playlist = _playlistService.AddPlaylist(request, email);
            return Ok(playlist);
        }

        [HttpPut("{id}")]
        public ActionResult<Playlist> PutPlaylist(int id, [FromBody] NewPlaylistRequest request)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _playlistService.GetUserOfItem(id) == email))
                return Unauthorized();

            var playlist = _playlistService.UpdatePlaylist(id, request);
            if (playlist == null)
                return null;
            return Ok(playlist);
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePlaylist(int id)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _playlistService.GetUserOfItem(id) == email))
                return Unauthorized();

            var deleted = _playlistService.DeletePlaylist(id);
            if (deleted)
                return Ok();
            return NotFound();
        }

        [HttpPost("{id}/tracks/{trackId}")]
        public ActionResult AddTrackToPlaylist(int id, int trackId, [FromQuery(Name = "note")] string? note)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _playlistService.GetUserOfItem(id) == email))
                return Unauthorized();

            if (note == null)
                note = "";
            var added = _playlistService.AddTrackToPlaylist(id, trackId, note);
            if (added)
                return Ok();
            return NotFound();
        }

        [HttpDelete("{id}/tracks/{trackId}")]
        public ActionResult RemoveTrackFromPlaylist(int id, int trackId)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            var email = User.FindFirstValue("Email");
            var role = User.FindFirstValue(ClaimTypes.Role) == null ? "" : User.FindFirstValue(ClaimTypes.Role);
            if (!(role == "Admin" || role == "Moderator" || _playlistService.GetUserOfItem(id) == email))
                return Unauthorized();

            var removed = _playlistService.RemoveTrackFromPlaylist(id, trackId);
            if (removed)
                return Ok();
            return NotFound();
        }

        [HttpGet("Length")]
        public ActionResult<List<PlaylistLength>> GetPlaylistLength([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            List<PlaylistLength> playlistLengths = new List<PlaylistLength>();

            playlistLengths = _playlistService.CalculateLength(filter);
            if (playlistLengths == null)
                return NotFound();

            var totalRecords = _playlistService.GetPlaylistsCount();
            var route = Request.Path.Value;
            var pagedReponse = PaginationHelper.CreatePagedReponse(playlistLengths, validFilter, totalRecords, _uriService, route);

            return Ok(pagedReponse);
        }


        [HttpPost("BulkDelete")]
        [Authorize(Roles = "Admin")]
        public ActionResult<bool> BulkDeleteAlbums([FromBody] List<int> ids)
        {
            bool result = _playlistService.Deleteplaylists(ids);
            return Ok(result);
        }
    }
}
