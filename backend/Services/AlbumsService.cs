using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using backend.Models.Request;
using backend.Models.Response;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AlbumsService
    {
        private readonly DatabaseContext _databaseContext;

        public AlbumsService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public int GetAlbumsCount()
        {
            return _databaseContext.Albums.Count();
        }

        public List<AlbumExtended> GetAll(PaginationFilter filter)
        {
            var albums = _databaseContext.Albums
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).OrderBy(a => a.Id).ToList();
            var albumReponses = new List<AlbumExtended>();
            foreach(var album in albums) 
            {
                var tracksCount = _databaseContext.Tracks.Where(s => s.AlbumId == album.Id).Count();
                albumReponses.Add(new AlbumExtended(album, tracksCount));
            }
            return albumReponses;
        }

        public Album GetById(int id)
        {
            var album = _databaseContext.Albums.Include(a => a.Artist).FirstOrDefault(album => album.Id == id);
            return album;
        }

        public Album AddAlbum(NewAlbumRequest request)
        {
            var artist = _databaseContext.Artists.FirstOrDefault(a => a.Id == request.ArtistId);
            if(artist == null)
            {
                return null;
            }

            var album = new Album()
            {
                Title = request.Title,
                ArtistId = request.ArtistId,
                ReleaseDate = request.ReleaseDate,
                CoverImageUrl = request.CoverImageUrl,
                AddedBy = ""
            };

            _databaseContext.Albums.Add(album);
            _databaseContext.SaveChanges();
            return album;


        }

        public Album UpdateAlbum(int id, NewAlbumRequest request)
        {
            var artist = _databaseContext.Artists.FirstOrDefault(a => a.Id == request.ArtistId);
            if (artist == null)
            {
                return null;
            }

            var album = _databaseContext.Albums.FirstOrDefault(a => a.Id == id);
            if (album == null)
            {
                return null;
            }

            album.Title = request.Title;
            album.ArtistId = request.ArtistId;
            album.ReleaseDate = request.ReleaseDate;
            album.CoverImageUrl = request.CoverImageUrl;
            _databaseContext.Update(album);
            _databaseContext.SaveChanges();
            return album;
        }

        public bool DeleteAlbum(int id)
        {
            var album = _databaseContext.Albums.FirstOrDefault(a => a.Id == id);
            if (album == null)
                return false;
            _databaseContext.Albums.Remove(album);
            _databaseContext.SaveChanges();
            return true;
        }
    }

    
}
