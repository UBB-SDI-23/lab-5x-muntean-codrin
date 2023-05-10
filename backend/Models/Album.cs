namespace backend.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ArtistId { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string CoverImageUrl { get; set; }
        public string AddedBy { get; set; }
        public Artist Artist { get; set; }
    }
}
