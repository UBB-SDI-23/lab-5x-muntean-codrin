using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using backend.Models.Request;
using backend.Models.Response;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TracksService
    {
        private readonly DatabaseContext _databaseContext;

        public TracksService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public int GetTracksCount()
        {
            return _databaseContext.Tracks.Count();
        }

        public List<TrackExtended> GetAll(PaginationFilter filter)
        {
            var tracks = _databaseContext.Tracks
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).OrderBy(a => a.Id).ToList();
            var tracksExtended = new List<TrackExtended>();
            foreach(var track in tracks)
            {
                var appearsInPlaylist = _databaseContext.TrackPlaylists.Where(pt => pt.TrackId == track.Id).Distinct().Count();
                tracksExtended.Add(new TrackExtended(track, appearsInPlaylist));
            }
            return tracksExtended;
        }

        public Track GetById(int id)
        {
            var track = _databaseContext.Tracks.Include(track => track.Album).FirstOrDefault(track => track.Id == id);
            return track;
        }

        public Track AddTrack(NewTrackRequest request, string email)
        {
            var album = _databaseContext.Albums.FirstOrDefault(a => a.Id == request.AlbumId);
            if(album == null)
            {
                return null;
            }
            var track = new Track()
            {
                Name = request.Name,
                AlbumId = request.AlbumId,
                Composer = request.Composer,
                Milliseconds = request.Milliseconds,
                ReleaseDate = request.ReleaseDate,
                AddedBy = email
            };
            _databaseContext.Tracks.Add(track);
            _databaseContext.SaveChanges();
            return track;
        }

        public Track UpdateTrack(int id, NewTrackRequest request)
        {
            var track = _databaseContext.Tracks.FirstOrDefault(track => track.Id == id);
            if(track == null)
            {
                return null;
            }
            track.Name = request.Name;
            track.AlbumId = request.AlbumId;
            track.Composer = request.Composer;
            track.Milliseconds = request.Milliseconds;
            track.ReleaseDate = request.ReleaseDate;
            _databaseContext.Tracks.Update(track);
            _databaseContext.SaveChanges();
            return track;
        }

        public bool DeleteTrack(int id)
        {
            var track = _databaseContext.Tracks.FirstOrDefault(track => track.Id == id);
            if(track == null)
            {
                return false;
            }
            _databaseContext.Tracks.Remove(track);
            _databaseContext.SaveChanges();
            return true;
        }

        public string GetUserOfItem(int id)
        {
            try
            {
                return _databaseContext.Tracks.First(track => track.Id == id).AddedBy;
            }
            catch
            {
                return "";
            }
        }

        public bool DeleteTracks(List<int> ids)
        {
            var tracks = _databaseContext.Tracks.Where(tracks => ids.Contains(tracks.Id)).ToList();
            if (tracks.Count == 0)
                return false;

            _databaseContext.Tracks.RemoveRange(tracks);
            _databaseContext.SaveChanges();
            return true;
        }


    }
}
