namespace backend.Models.Response
{
    public class PlaylistResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<TrackResponse> TrackList { get; set; }
    }
}
