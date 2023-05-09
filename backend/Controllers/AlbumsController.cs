using backend.Helpers;
using backend.Models;
using backend.Models.Request;
using backend.Models.Response;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

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
            List<AlbumResponse> albums = new List<AlbumResponse>();

            albums = _albumService.GetAll(filter);
            
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
        public ActionResult<Album> PostAlbum([FromBody] NewAlbumRequest request)
        {
            var album = _albumService.AddAlbum(request);
            if (album == null)
                return NotFound();
            return Ok(album);
        }

        [HttpPut("{id}")]
        public ActionResult<Album> PutAlbum(int id, [FromBody] NewAlbumRequest request)
        {
            var album = _albumService.UpdateAlbum(id, request);
            if (album == null)
                return NotFound();
            return Ok(album);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteAlbum(int id)
        {
            var deleted = _albumService.DeleteAlbum(id);
            if (deleted == false)
                return NotFound();
            return Ok();
        }
    }
}
