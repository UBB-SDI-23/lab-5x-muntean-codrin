namespace backend.Models.Extended
{
    public class TrackExtended
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AlbumId { get; set; }
        public string Composer { get; set; }
        public int Milliseconds { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int AppearsInPlaylists { get; set; }

        public string AddedBy { get; set; }

        public TrackExtended(Track track, int appearsInPlaylists)
        {
            Id = track.Id;
            Name = track.Name;
            AlbumId = track.AlbumId;
            Composer = track.Composer;
            Milliseconds = track.Milliseconds;
            ReleaseDate = track.ReleaseDate;
            AppearsInPlaylists = appearsInPlaylists;
            AddedBy = track.AddedBy;
        }
    }
}
