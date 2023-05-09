using backend.Helpers;
using backend.Models;
using backend.Models.Request;
using backend.Models.Response;
using backend.Models.Statistics;

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

        public List<Artist> GetAll(PaginationFilter filter)
        {
            return _databaseContext.Artists
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).OrderBy(a => a.Id).ToList();
        }

        public List<Artist> GetAllAfterYear(PaginationFilter filter, int year)
        {
            return _databaseContext.Artists.Where(artist => artist.DebutYear > year)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).OrderBy(a => a.Id).ToList();
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

        public Artist AddArtist(NewArtistRequest request)
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

        //public List<ArtistSongs> GetArtistsSongs()
        //{

        //    var artists = _databaseContext.Artists.ToList();
        //    var artistsSongs = new List<ArtistSongs>();
        //    foreach (var artist in artists)
        //    {
        //        var artistSongs = new ArtistSongs();
        //        artistSongs.ArtistId = artist.Id;
        //        artistSongs.ArtistName = artist.Name;

        //        var songsCount = _databaseContext.Tracks.Where(t => t.)

        //        artistSongs.SongsCount = songsCount;
        //        artistsSongs.Add(artistSongs);
        //    }
        //    artistsSongs.Sort((a, b) => b.SongsCount - a.SongsCount);
        //    return artistsSongs;
        //}

        //public int GetArtistsSongsCount()
        //{
        //}
    }
}
