using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using backend.Models.Request;
using backend.Models.Response;
using backend.Models.Statistics;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

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
        public ActionResult<Playlist> PostPlaylist([FromBody] NewPlaylistRequest request)
        {
            Playlist playlist = _playlistService.AddPlaylist(request);
            return Ok(playlist);
        }

        [HttpPut("{id}")]
        public ActionResult<Playlist> PutPlaylist(int id, [FromBody] NewPlaylistRequest request)
        {
            var playlist = _playlistService.UpdatePlaylist(id, request);
            if (playlist == null)
                return null;
            return Ok(playlist);
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePlaylist(int id)
        {
            var deleted = _playlistService.DeletePlaylist(id);
            if (deleted)
                return Ok();
            return NotFound();
        }

        [HttpPost("{id}/tracks/{trackId}")]
        public ActionResult AddTrackToPlaylist(int id, int trackId, [FromQuery(Name = "note")] string? note)
        {
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
    }
}
