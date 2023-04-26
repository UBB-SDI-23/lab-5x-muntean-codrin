package com.codrin.tests;


import com.codrin.model.*;
import com.codrin.model.Statistics.PlaylistLength;
import com.codrin.repository.*;
import com.codrin.service.ArtistService;
import com.codrin.service.PlaylistService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
public class ServiceTests {

    @InjectMocks
    private PlaylistService playlistService;

    @InjectMocks
    private ArtistService artistService;

    @Mock
    private TrackRepository trackRepository;
    @Mock
    private PlaylistRepository playlistRepository;

    @Mock
    private ArtistRepository artistRepository;

    @Mock
    private TrackPlaylistRespository trackPlaylistRespository;

    @Mock
    private AlbumRepository albumRepository;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        playlistService.setPlaylistRepository(playlistRepository);
        playlistService.setTrackRepository(trackRepository);
        playlistService.setTrackPlaylistRespository(trackPlaylistRespository);
        artistService.setArtistRepository(artistRepository);
        artistService.setAlbumRepository(albumRepository);
        artistService.setTrackRepository(trackRepository);


        List<TrackPlaylist> trackPlaylists = new ArrayList<>();
        var playlist = new Playlist("Metallica", 1);
        trackPlaylists.add(new TrackPlaylist(new TrackPlaylistKey(1, 1), new Track(1, "Nothing else matters", "Metallica", 7200, new Date()), playlist));
        trackPlaylists.add(new TrackPlaylist(new TrackPlaylistKey(2, 1), new Track(2, "Enter Sandman", "Metallica", 4500, new Date()), playlist));
        trackPlaylists.add(new TrackPlaylist(new TrackPlaylistKey(3, 1), new Track(3, "Master of Puppets", "Metallica", 2000, new Date()), playlist));
        trackPlaylists.add(new TrackPlaylist(new TrackPlaylistKey(4, 1), new Track(4, "The Unforgiven", "Metallica", 5000, new Date()), playlist));


        List<Artist> artists = new ArrayList<>();
        artists.add(new Artist(1, "Metallica", 1981));
        artists.add(new Artist(2, "Iron Maiden", 1975));

        var album1 = new Album(1, "Album1");
        var album2 = new Album(2, "Album2");

        album1.setArtist(artists.get(0));
        album2.setArtist(artists.get(1));

        List<Track> tracks = new ArrayList<>();
        tracks.add(new Track(1, "Nothing else matters", "Metallica", 7200, new Date()));
        tracks.add(new Track(2, "Enter Sandman", "Metallica", 4500, new Date()));
        tracks.add(new Track(3, "Master of Puppets", "Metallica", 2000, new Date()));
        tracks.add(new Track(4, "The Unforgiven", "Metallica", 5000, new Date()));
        tracks.add(new Track(5, "The Unforgiven 2", "Metallica", 5000, new Date()));

        tracks.get(0).setAlbum(album1);
        tracks.get(1).setAlbum(album1);
        tracks.get(2).setAlbum(album2);
        tracks.get(3).setAlbum(album2);
        tracks.get(4).setAlbum(album2);

        Mockito.when(playlistRepository.findById(1)).thenReturn(Optional.of(new Playlist("Metallica")));
        Mockito.when(trackPlaylistRespository.findAll()).thenReturn(trackPlaylists);
        Mockito.when(artistRepository.findAll()).thenReturn(artists);
        Mockito.when(trackRepository.findAll()).thenReturn(tracks);
    }


    @Test
    public void testArtistServicegetArtistSongs()
    {
        var artistSongs = artistService.getArtistsSongs();
        Assert.assertEquals(artistSongs.get(0).getSongsCount(), 3);
        Assert.assertEquals(artistSongs.get(0).getArtistName(), "Iron Maiden");
        Assert.assertEquals(artistSongs.get(1).getSongsCount(), 2);
        Assert.assertEquals(artistSongs.get(1).getArtistName(), "Metallica");
    }
}