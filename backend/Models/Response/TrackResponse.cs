namespace backend.Models.Response
{
    public class TrackResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AlbumId { get; set; }
        public string Composer { get; set; }
        public int Milliseconds { get; set; }
        public DateTime ReleaseDate { get; set; }

        public TrackResponse(Track track)
        {
            Id = track.Id;
            Name = track.Name;
            AlbumId = track.AlbumId;
            Composer = track.Composer;
            Milliseconds = track.Milliseconds;
            ReleaseDate = track.ReleaseDate;
        }
    }
}
