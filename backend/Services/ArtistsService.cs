using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using backend.Models.Request;
using backend.Models.Response;
using backend.Models.Statistics;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ArtistsService
    {
        private readonly DatabaseContext _databaseContext;
        public ArtistsService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public int GetArtistsCount()
        {
            return _databaseContext.Artists.Count();
        }

        public int GetArtistsCount(int year)
        {
            return _databaseContext.Artists.Where(artist => artist.DebutYear > year).Count();
        }

        public List<ArtistExtended> GetAll(PaginationFilter filter)
        {
            var artists = _databaseContext.Artists
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).OrderBy(a => a.Id).ToList();

            List<ArtistExtended> artistsExtended = new List<ArtistExtended>();
            foreach (var artist in artists)
            {
                var albumsCount = _databaseContext.Albums.Where(a => a.ArtistId == artist.Id).Count();
                artistsExtended.Add(new ArtistExtended(artist, albumsCount));
            }
            return artistsExtended;
        }

        public List<ArtistExtended> GetAllAfterYear(PaginationFilter filter, int year)
        {
            var artists = _databaseContext.Artists.Where(artist => artist.DebutYear > year)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).OrderBy(a => a.Id).ToList();

            List<ArtistExtended> artistsExtended = new List<ArtistExtended>();
            foreach (var artist in artists)
            {
                var albumsCount = _databaseContext.Albums.Where(a => a.ArtistId == artist.Id).Count();
                artistsExtended.Add(new ArtistExtended(artist, albumsCount));
            }
            return artistsExtended;
        }

        public ArtistResponse GetById(int id)
        {
            var artist = _databaseContext.Artists.FirstOrDefault(artist => artist.Id == id);
            if (artist == null)
            {
                return null;
            }
            var albums = _databaseContext.Albums.Where(album => album.ArtistId == id);
            var albumResponses = new List<AlbumResponse>();
            foreach (var album in albums)
            {
                albumResponses.Add(new AlbumResponse(album));
            }

            return new ArtistResponse(artist, albumResponses);
        }

        public Artist AddArtist(NewArtistRequest request, string email)
        {
            Artist artist = new Artist()
            {
                Name = request.Name,
                Description = request.Description,
                WebsiteLink = request.WebsiteLink,
                DebutYear = request.DebutYear,
                ProfilePictureUrl = request.ProfilePictureUrl,
                AddedBy = email
            };
            _databaseContext.Artists.Add(artist);
            _databaseContext.SaveChanges();
            return artist;
        }

        public Artist UpdateArtist(int id, NewArtistRequest request)
        {
            var artist = _databaseContext.Artists.FirstOrDefault(artist => artist.Id == id);
            if (artist == null)
                return null;
            artist.Name = request.Name;
            artist.Description = request.Description;
            artist.WebsiteLink = request.WebsiteLink;
            artist.ProfilePictureUrl = request.ProfilePictureUrl;
            artist.DebutYear = request.DebutYear;
            _databaseContext.Update(artist);
            _databaseContext.SaveChanges();

            return artist;
        }

        public bool DeleteArtist(int id)
        {
            var artist = _databaseContext.Artists.FirstOrDefault(artist => artist.Id == id);
            if (artist == null)
                return false;
            _databaseContext.Artists.Remove(artist);
            _databaseContext.SaveChanges();
            return true;
        }

        public bool DeleteArtists(List<int> ids)
        {
            var artists = _databaseContext.Artists.Where(artist => ids.Contains(artist.Id)).ToList();
            if (artists.Count == 0)
                return false;

            _databaseContext.Artists.RemoveRange(artists);
            _databaseContext.SaveChanges();
            return true;
        }

        public List<Artist> AddArtists(List<NewArtistRequest> requests)
        {
            var artists = new List<Artist>();
            foreach (var request in requests)
            {
                Artist artist = new Artist()
                {
                    Name = request.Name,
                    Description = request.Description,
                    WebsiteLink = request.WebsiteLink,
                    DebutYear = request.DebutYear,
                    ProfilePictureUrl = request.ProfilePictureUrl
                };
                _databaseContext.Artists.Add(artist);
                artists.Add(artist);
            }

            _databaseContext.SaveChanges();
            return artists;
        }


        public List<ArtistSongs> GetArtistsSongs(PaginationFilter filter)
        {
            var artistSongs = from artist in _databaseContext.Artists
                              join album in _databaseContext.Albums on artist.Id equals album.ArtistId
                              join track in _databaseContext.Tracks on album.Id equals track.AlbumId into trackGroup
                              from track in trackGroup.DefaultIfEmpty()
                              group track by new { artist.Id, artist.Name } into artistGroup
                              select new ArtistSongs
                              {
                                  ArtistId = artistGroup.Key.Id,
                                  ArtistName = artistGroup.Key.Name,
                                  SongsCount = artistGroup.Count(t => t != null)
                              };

            return artistSongs.OrderByDescending(a => a.SongsCount)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).ToList();
        }

        public string GetUserOfItem(int id)
        {
            try
            {
                return _databaseContext.Artists.First(artist => artist.Id == id).AddedBy;
            }
            catch
            {
                return "";
            }
        }
    }
}
