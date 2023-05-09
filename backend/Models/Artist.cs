namespace backend.Models
{
    public class Artist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string WebsiteLink { get; set; }
        public int DebutYear { get; set; }
        public string ProfilePictureUrl { get; set; }
    }
}
