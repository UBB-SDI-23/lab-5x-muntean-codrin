package com.codrin;

import com.codrin.model.Artist;
import com.codrin.model.Playlist;
import com.codrin.model.Request.NewAlbumRequest;
import com.codrin.model.Request.NewTrackRequest;
import com.codrin.model.TrackPlaylist;
import com.codrin.model.TrackPlaylistKey;
import com.codrin.repository.ArtistRepository;
import com.codrin.repository.PlaylistRepository;
import com.codrin.repository.TrackPlaylistRespository;
import com.codrin.service.AlbumService;
import com.codrin.service.PlaylistService;
import com.codrin.service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

@Component
public class DBOperationRunner implements CommandLineRunner {
    @Autowired
    ArtistRepository artistRepository;

    @Autowired
    PlaylistRepository playlistRepository;

    @Autowired
    PlaylistService playlistService;

    @Autowired
    AlbumService albumService;

    @Autowired
    TrackService trackService;

    @Override
    public void run(String... args) throws Exception {
        artistRepository.saveAll(
                Arrays.asList(
                        new Artist("Metallica", "...", "http://www.metallica.com", 1981, "http://www.metalica.com/pfp.jpg"),
                        new Artist("Iron Maiden", "...", "http://www.ironmaiden.com", 1980, "http://www.ironmaiden.com/pfp.jpg"),
                        new Artist("Slayer", "...", "http://www.slayer.com", 1982, "http://www.slayer.com/pfp.jpg"),
                        new Artist("Megadeth", "...", "http://www.megadeth.com", 1983, "http://www.megadeth.com/pfp.jpg"),
                        new Artist("Friday Pilots Club", "...", "http://www.fpc.com", 2000, "http://www.fpc.com/pfp.jpg"),
                        new Artist("Black Sabbath", "...", "http://www.blacksabbath.com", 1985, "http://www.blacksabbath.com/pfp.jpg"),
                        new Artist("Judas Priest", "...", "http://www.judaspriest.com", 1986, "http://www.judaspriest.com/pfp.jpg"),
                        new Artist("Pantera", "...", "http://www.pantera.com", 1987, "http://www.pantera.com/pfp.jpg"),
                        new Artist("Muse", "...", "http://www.muse.com", 2005, "http://www.muse.com/pfp.jpg"),
                        new Artist("Ashnikko", "...", "http://www.ashnikko.com", 2010, "http://www.ashnikko.com/pfp.jpg")
                )

        );

        albumService.addAlbum(new NewAlbumRequest("Kill 'Em All", "...", 1, new Date(2000,10,2), "http://www.metallica.com/kill-em-all.jpg"));
        albumService.addAlbum(new NewAlbumRequest("Ride the Lightning", "...", 1, new Date(2000,10,2), "http://www.metallica.com/ride-the-lightning.jpg"));
        albumService.addAlbum(new NewAlbumRequest("Simulation Theory", "...", 9, new Date(2000,10,2), "http://www.muse.com/simulation-theory.jpg"));
        albumService.addAlbum(new NewAlbumRequest("Dystopia", "...", 9, new Date(2000,10,2), "http://www.muse.com/dystopia.jpg"));
        albumService.addAlbum(new NewAlbumRequest("DEMIDEVIL", "...", 10, new Date(2000,10,2), "http://www.ashnikko.com/demidevil.jpg"));
        albumService.addAlbum(new NewAlbumRequest("Daisy", "...", 10, new Date(2000,10,2), "http://www.ashnikko.com/daisy.jpg"));
        albumService.addAlbum(new NewAlbumRequest("Fear of the Dark", "...", 7, new Date(2000,10,2), "http://www.judaspriest.com/fear-of-the-dark.jpg"));
        albumService.addAlbum(new NewAlbumRequest("Painkiller", "...", 3, new Date(2000,10,2), "http://www.slayer.com/painkiller.jpg"));
        albumService.addAlbum(new NewAlbumRequest("Reign in Blood", "...", 3, new Date(2000,10,2), "http://www.slayer.com/reign-in-blood.jpg"));
        albumService.addAlbum(new NewAlbumRequest("The Number of the Beast", "...", 7, new Date(2000,10,2), "http://www.judaspriest.com/the-number-of-the-beast.jpg"));

        trackService.addTrack(new NewTrackRequest("Battery", 1, "Lars Ulrich", 2700, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("Master of Puppets", 1, "Lars Ulrich", 6200, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("Seek & Destroy", 1, "Lars Ulrich", 4700, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("The Four Horsemen", 1, "Lars Ulrich", 3200, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("Creeping Death", 1, "Lars Ulrich", 4200, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("For Whom the Bell Tolls", 1, "Lars Ulrich", 5200, new Date(2000,10,2)));

        trackService.addTrack(new NewTrackRequest("Pressure", 4, "Matt Bellamy", 2700, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("Break It to Me", 4, "Matt Bellamy", 2200, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("Something Human", 4, "Matt Bellamy", 2700, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("Thought Contagion", 4, "Matt Bellamy", 3200, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest("Blockades", 4, "Matt Bellamy", 4000, new Date(2000,10,2)));

        trackService.addTrack(new NewTrackRequest( "L8r boy",5, "Ashnikko", 2700, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest( "Daisy",5, "Ashnikko", 6200, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest( "Stupid",5, "Ashnikko", 4700, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest( "Slumber Party",5, "Ashnikko", 3200, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest( "Dm me",5, "Ashnikko", 4200, new Date(2000,10,2)));
        trackService.addTrack(new NewTrackRequest( "Stupid",5, "Ashnikko", 5200, new Date(2000,10,2)));


        playlistRepository.saveAll(Arrays.asList(
            new Playlist("Mettalica"),
            new Playlist("Judas Priest"),
            new Playlist("Ashnikko"),
            new Playlist("Muse"),
            new Playlist("Slayer"),
            new Playlist("Gym"),
            new Playlist("Workout"),
            new Playlist("Party"),
            new Playlist("Roadtrip"),
            new Playlist("Chill")
        ));

        playlistService.addTrackToPlaylist(1, 1);
        playlistService.addTrackToPlaylist(2, 1);
        playlistService.addTrackToPlaylist(3, 1);
        playlistService.addTrackToPlaylist(4, 1);
        playlistService.addTrackToPlaylist(5, 1);
        playlistService.addTrackToPlaylist(6, 1);


        playlistService.addTrackToPlaylist(7, 4);
        playlistService.addTrackToPlaylist(8, 4);
        playlistService.addTrackToPlaylist(9, 4);
        playlistService.addTrackToPlaylist(10, 4);
        playlistService.addTrackToPlaylist(11, 4);

        playlistService.addTrackToPlaylist(1, 8);
        playlistService.addTrackToPlaylist(2, 8);
        playlistService.addTrackToPlaylist(3, 8);
        playlistService.addTrackToPlaylist(4, 8);
        playlistService.addTrackToPlaylist(5, 8);
        playlistService.addTrackToPlaylist(6, 8);


        playlistService.addTrackToPlaylist(7, 8);
        playlistService.addTrackToPlaylist(8, 8);
        playlistService.addTrackToPlaylist(9, 8);
        playlistService.addTrackToPlaylist(10,8);
        playlistService.addTrackToPlaylist(11,8);
        playlistService.addTrackToPlaylist(12,8);
        playlistService.addTrackToPlaylist(13,8);
        playlistService.addTrackToPlaylist(14,8);
        playlistService.addTrackToPlaylist(15,8);
        playlistService.addTrackToPlaylist(16,8);
        playlistService.addTrackToPlaylist(17,8);


    }

}
