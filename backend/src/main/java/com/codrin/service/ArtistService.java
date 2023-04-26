package com.codrin.service;

import com.codrin.model.Response.AlbumResponse;
import com.codrin.model.Artist;
import com.codrin.model.Response.ArtistResponse;
import com.codrin.model.Request.NewArtistRequest;
import com.codrin.model.Statistics.ArtistsSongs;
import com.codrin.repository.AlbumRepository;
import com.codrin.repository.ArtistRepository;
import com.codrin.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ArtistService
{
    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private TrackRepository trackRepository;

    public void setArtistRepository(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public void setAlbumRepository(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    public void setTrackRepository(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    public List<Artist> getAll()
    {
        return artistRepository.findAll();
    }

    public List<Artist> getAllAfterYear(int year)
    {
        return artistRepository.findAll().stream().filter(a -> a.getDebutYear() > year).collect(Collectors.toList());
    }

    public ArtistResponse getById(int id)
    {
        var artist = artistRepository.findById(id).orElse(null);
        if(artist == null)
            return null;

        var albums = albumRepository.findAll().stream().filter(a -> a.getArtist().getId() == artist.getId()).toList();
        var albumsReponses = new ArrayList<AlbumResponse>();
        for (var album : albums) {
            albumsReponses.add(new AlbumResponse(album));
        }
        return new ArtistResponse(artist, albumsReponses);
    }

    public Artist addArtist(NewArtistRequest request)
    {
        Artist artist = new Artist();
        artist.setName(request.name());
        artist.setDescription(request.description());
        artist.setDebutYear(request.debutYear());
        artist.setWebsiteLink(request.websiteLink());
        artist.setProfilePictureUrl(request.profilePictureUrl());
        artistRepository.save(artist);

        return artist;
    }

    public Artist updateArtist(int id, NewArtistRequest request)
    {
        var artist = artistRepository.findById(id).orElse(null);
        if(artist == null)
            return null;
        artist.setName(request.name());
        artist.setDescription(request.description());
        artist.setDebutYear(request.debutYear());
        artist.setWebsiteLink(request.websiteLink());
        artist.setProfilePictureUrl(request.profilePictureUrl());
        artistRepository.save(artist);

        return artist;
    }

    public boolean deleteArtist(int id)
    {
        var exists = artistRepository.existsById(id);
        if(exists)
            artistRepository.deleteById(id);
        return exists;
    }

    public List<ArtistsSongs> getArtistsSongs()
    {
        var artists = artistRepository.findAll();
        var artistsSongs = new ArrayList<ArtistsSongs>();
        for (var artist : artists) {
            var artistSong = new ArtistsSongs();
            artistSong.setArtistName(artist.getName());
            artistSong.setArtistId(artist.getId());
            var songCount = (int)trackRepository.findAll().stream().filter(t -> t.getAlbum().getArtist().getId() == artist.getId()).count();
            artistSong.setSongsCount(songCount);
            artistsSongs.add(artistSong);
        }
        artistsSongs.sort((a, b) -> b.getSongsCount() - a.getSongsCount());
        return artistsSongs;
    }


}
