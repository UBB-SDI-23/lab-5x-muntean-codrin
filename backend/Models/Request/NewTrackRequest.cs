namespace backend.Models.Request
{
    public class NewTrackRequest
    {
        public string Name { get; set; }
        public int AlbumId { get; set; }
        public string Composer { get; set; }
        public int Milliseconds { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
