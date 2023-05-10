namespace backend.Models.Response
{
    public class PlaylistResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<TrackResponse> TrackList { get; set; }
        public string AddedBy { get; set; }

        public PlaylistResponse(Playlist playlist)
        {
            Id = playlist.Id;
            Name = playlist.Name;
            AddedBy = playlist.AddedBy;
            TrackList = new List<TrackResponse>();

        }
    }
}
