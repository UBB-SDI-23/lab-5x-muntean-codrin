using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace backend
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<TrackPlaylist> TrackPlaylists { get; set; }


        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TrackPlaylist>()
                .HasKey(bc => new { bc.TrackId, bc.PlaylistId });


        }
    }
}
