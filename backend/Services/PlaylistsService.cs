using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using backend.Models.Request;
using backend.Models.Response;
using backend.Models.Statistics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class PlaylistsService
    {
        private readonly DatabaseContext _databaseContext;
        public PlaylistsService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public List<PlaylistExtended> GetAll(PaginationFilter filter)
        {
            var playlists = _databaseContext.Playlists
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .OrderBy(p => p.Id)
                .ToList();
            var playlistsExtended = new List<PlaylistExtended>();
            foreach(var playlist in playlists) 
            {
                var tracksCount = _databaseContext.TrackPlaylists.Where(tp => tp.PlaylistId == playlist.Id).Count();
                var playlistExtended = new PlaylistExtended(playlist, tracksCount);
                playlistsExtended.Add(playlistExtended);
            }
            return playlistsExtended;
        }
        public int GetPlaylistsCount()
        {
            return _databaseContext.Playlists.Count();
        }

        public PlaylistResponse GetById(int id)
        {
            var playlist = _databaseContext.Playlists.FirstOrDefault(p => p.Id == id);
            if (playlist == null)
            {
                return null;
            }

            var playlistResponse = new PlaylistResponse();
            playlistResponse.Id = id;
            playlistResponse.Name = playlist.Name;

            var tracks = _databaseContext.TrackPlaylists.Include(tp => tp.Track).Where(t => t.PlaylistId == id).Select(tp => tp.Track).ToList();
            var trackResponses = new List<TrackResponse>();
            foreach(var track in tracks )
            {
                var trackResponse = new TrackResponse(track);
                trackResponses.Add(trackResponse);
            }
            playlistResponse.TrackList = trackResponses;
            return playlistResponse;
        }

        public Playlist AddPlaylist(NewPlaylistRequest request)
        {
            Playlist playlist = new Playlist();
            playlist.Name = request.Name;
            _databaseContext.Playlists.Add(playlist);
            _databaseContext.SaveChanges();
            return playlist;
        }

        public Playlist UpdatePlaylist(int id, NewPlaylistRequest request)
        {
            var playlist = _databaseContext.Playlists.FirstOrDefault(p => p.Id == id);
            if (playlist == null)
                return null;
            playlist.Name = request.Name;
            _databaseContext.Update(playlist);
            _databaseContext.SaveChanges();

            return playlist;
        }

        public bool DeletePlaylist(int id)
        {
            var playlist = _databaseContext.Playlists.FirstOrDefault(p => p.Id == id);
            if (playlist == null)
                return false;
            _databaseContext.Remove(playlist);
            _databaseContext.SaveChanges();
            return true;
        }

        public bool AddTrackToPlaylist(int playlistId, int trackId, string note)
        {
            var track = _databaseContext.Tracks.FirstOrDefault(t => t.Id == trackId);
            if (track == null)
                return false;

            var playlist = _databaseContext.Playlists.FirstOrDefault(p => p.Id == playlistId);
            if (track == null)
                return false;

            var trackPlaylist = new TrackPlaylist();
            trackPlaylist.PlaylistId = playlistId;
            trackPlaylist.TrackId = trackId;
            trackPlaylist.Note = note;
            trackPlaylist.DateAdded = DateTime.Now;
            _databaseContext.Add(trackPlaylist);
            _databaseContext.SaveChanges();
            return true;
        }

        public bool RemoveTrackFromPlaylist(int playlistId, int trackId)
        {
            var trackPlaylist = _databaseContext.TrackPlaylists.FirstOrDefault(tp => tp.PlaylistId == playlistId && tp.TrackId == trackId);
            if (trackPlaylist == null)
                return false;
            _databaseContext.Remove(trackPlaylist);
            _databaseContext.SaveChanges();
            return true;
        }

        public List<PlaylistLength> CalculateLength(PaginationFilter filter)
        {
            var playlistLengths = from playlist in _databaseContext.Playlists
                                  join trackPlaylist in _databaseContext.TrackPlaylists on playlist.Id equals trackPlaylist.PlaylistId
                                  join track in _databaseContext.Tracks on trackPlaylist.TrackId equals track.Id
                                  group track by new { playlist.Id, playlist.Name } into playlistGroup
                                  select new PlaylistLength
                                  {
                                      PlaylistId = playlistGroup.Key.Id,
                                      PlaylistName = playlistGroup.Key.Name,
                                      Length = playlistGroup.Sum(t => t.Milliseconds)
                                  };

            return playlistLengths.OrderBy(p => p.PlaylistId)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).ToList();
        }
    }
}
