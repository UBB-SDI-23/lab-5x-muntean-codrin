package com.codrin.model.Response;

import com.codrin.model.Album;
import jakarta.persistence.ManyToOne;

import java.util.Date;

public class AlbumResponse {
    private int id;

    private String title;

    private String description;

    private int artistId;

    private Date releaseDate;

    private String coverImageUrl;

    public AlbumResponse(Album album)
    {
        this.id = album.getId();
        this.title = album.getTitle();
        this.description = album.getDescription();
        this.artistId = album.getArtist().getId();
        this.releaseDate = album.getReleaseDate();
        this.coverImageUrl = album.getCoverImageUrl();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getArtistId() {
        return artistId;
    }

    public void setArtistId(int artistId) {
        this.artistId = artistId;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }



}
