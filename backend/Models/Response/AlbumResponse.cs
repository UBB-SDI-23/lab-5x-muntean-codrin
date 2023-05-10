namespace backend.Models.Response
{
    public class AlbumResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ArtistId { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string CoverImageUrl { get; set; }
        public string AddedBy { get; set; }

        public AlbumResponse(Album album)
        {
            this.Id = album.Id;
            this.Title = album.Title;
            this.ArtistId = album.ArtistId;
            this.ReleaseDate = album.ReleaseDate;
            this.CoverImageUrl = album.CoverImageUrl;
            AddedBy = album.AddedBy;
        }
    }
}
