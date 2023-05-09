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
    }
}
