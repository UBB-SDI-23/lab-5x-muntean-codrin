using backend.Helpers;
using backend.Models;
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

        public List<TrackResponse> GetAll(PaginationFilter filter)
        {
            var tracks = _databaseContext.Tracks
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).OrderBy(a => a.Id).ToList();
            var trackReponses = new List<TrackResponse>();
            foreach(var track in tracks)
            {
                trackReponses.Add(new TrackResponse(track));
            }
            return trackReponses;
        }

        public Track GetById(int id)
        {
            var track = _databaseContext.Tracks.Include(track => track.Album).FirstOrDefault(track => track.Id == id);
            return track;
        }

        public Track AddTrack(NewTrackRequest request)
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
                ReleaseDate = request.ReleaseDate
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


    }
}
