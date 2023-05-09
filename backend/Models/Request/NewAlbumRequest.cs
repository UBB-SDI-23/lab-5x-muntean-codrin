namespace backend.Models.Request
{
    public class NewAlbumRequest
    {
        public string Title { get; set; }
        public int ArtistId { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string CoverImageUrl { get; set; }
    }
}
