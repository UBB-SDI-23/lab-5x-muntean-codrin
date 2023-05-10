namespace backend.Models.Extended
{
    public class ArtistExtended
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string WebsiteLink { get; set; }
        public int DebutYear { get; set; }
        public string ProfilePictureUrl { get; set; }
        public int AlbumsCount { get; set; }

        public string AddedBy { get; set; }

        public ArtistExtended(Artist artist, int albumsCount)
        {
            Id = artist.Id;
            Name = artist.Name;
            Description = artist.Description;
            WebsiteLink = artist.WebsiteLink;
            DebutYear = artist.DebutYear;
            ProfilePictureUrl = artist.ProfilePictureUrl;
            AlbumsCount = albumsCount;
            AddedBy = artist.AddedBy;
        }
    }
}
