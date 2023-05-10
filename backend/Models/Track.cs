namespace backend.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AlbumId { get; set; }
        public string Composer { get; set; }
        public int Milliseconds { get; set; }
        public DateTime ReleaseDate { get; set; }
        public Album Album { get; set; }
        public string AddedBy { get; set; }
    }
}
