package com.codrin;

import com.codrin.service.AlbumService;
import com.codrin.service.ArtistService;
import com.codrin.service.PlaylistService;
import com.codrin.service.TrackService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(value={"com.codrin.controller"})
public class DIConfiguration {

    @Bean
    public ArtistService getArtistService(){
        return new ArtistService();
    }

    @Bean
    public AlbumService getAlbumService(){
        return new AlbumService();
    }

    @Bean
    public TrackService getTrackService(){
        return new TrackService();
    }

    @Bean
    public PlaylistService getPlaylistService(){
        return new PlaylistService();
    }
}
