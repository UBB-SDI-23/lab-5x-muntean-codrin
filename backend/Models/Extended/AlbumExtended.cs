namespace backend.Models.Extended
{
    public class AlbumExtended
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ArtistId { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string CoverImageUrl { get; set; }

        public int TracksCount { get; set; }

        public AlbumExtended(Album album, int tracksCount)
        {
            this.Id = album.Id;
            this.Title = album.Title;
            this.ArtistId = album.ArtistId;
            this.ReleaseDate = album.ReleaseDate;
            this.CoverImageUrl = album.CoverImageUrl;
            TracksCount = tracksCount;
        }
    }
}
