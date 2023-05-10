namespace backend.Models.Extended
{
    public class PlaylistExtended
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TracksCount { get; set; }

        public PlaylistExtended(Playlist playlist, int tracksCount)
        {
            Id = playlist.Id;
            Name = playlist.Name;
            TracksCount = tracksCount;
        }
    }
}
