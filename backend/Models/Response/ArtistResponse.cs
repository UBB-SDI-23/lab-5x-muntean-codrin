namespace backend.Models.Response
{
    public class ArtistResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string WebsiteLink { get; set; }
        public int DebutYear { get; set; }
        public string ProfilePictureUrl { get; set; }
        public List<AlbumResponse> albumList;

        public ArtistResponse(Artist artist, List<AlbumResponse> albumList)
        {
            this.Id = artist.Id;
            this.Name = artist.Name;
            this.Description = artist.Description;
            this.WebsiteLink = artist.WebsiteLink;
            this.DebutYear = artist.DebutYear;
            this.ProfilePictureUrl = artist.ProfilePictureUrl;
            this.albumList = albumList;
        }
    }
}
