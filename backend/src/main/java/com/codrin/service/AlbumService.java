package com.codrin.service;

import com.codrin.model.Album;
import com.codrin.model.Response.AlbumResponse;
import com.codrin.model.Request.NewAlbumRequest;
import com.codrin.repository.AlbumRepository;
import com.codrin.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    public List<AlbumResponse> getAll()
    {
        var albums = albumRepository.findAll();
        var albumResponses = new ArrayList<AlbumResponse>();
        for (var album : albums) {
            albumResponses.add(new AlbumResponse(album));
        }
        return albumResponses;
    }

    public Album getById(int id)
    {
        return albumRepository.findById(id).orElse(null);
    }

    public Album addAlbum(NewAlbumRequest request)
    {
        var artist = artistRepository.findById(request.artistId()).orElse(null);
        if(artist == null)
            return null;

        Album album = new Album();
        album.setTitle(request.title());
        album.setDescription(request.description());
        album.setArtist(artist);
        album.setReleaseDate(request.releaseDate());
        album.setCoverImageUrl(request.coverImageUrl());
        albumRepository.save(album);

        return album;
    }

    public Album updateAlbum(int id, NewAlbumRequest request)
    {
        var album = albumRepository.findById(id).orElse(null);
        if(album == null)
            return null;

        var artist = artistRepository.findById(request.artistId()).orElse(null);
        if(artist == null)
            return null;

        album.setTitle(request.title());
        album.setDescription(request.description());
        album.setArtist(artist);
        album.setReleaseDate(request.releaseDate());
        album.setCoverImageUrl(request.coverImageUrl());
        albumRepository.save(album);
        return album;
    }

    public boolean deleteAlbum(int id)
    {
        var exists = albumRepository.existsById(id);
        if(exists)
            albumRepository.deleteById(id);
        return exists;
    }


}
