package com.codrin.model.Response;

import com.codrin.model.Track;
import jakarta.persistence.ManyToOne;

import java.util.Date;

public class TrackResponse {
    private int id;

    private String name;

    private int albumId;

    private String composer;

    private int milliseconds;

    private Date releaseDate;

    public TrackResponse() {
    }

    public TrackResponse(Track track)
    {
        this.id = track.getId();
        this.name = track.getName();
        this.albumId = track.getAlbum().getId();
        this.composer = track.getComposer();
        this.releaseDate = track.getReleaseDate();
        this.milliseconds = track.getMilliseconds();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAlbumId() {
        return albumId;
    }

    public void setAlbumId(int albumId) {
        this.albumId = albumId;
    }

    public String getComposer() {
        return composer;
    }

    public void setComposer(String composer) {
        this.composer = composer;
    }

    public int getMilliseconds() {
        return milliseconds;
    }

    public void setMilliseconds(int milliseconds) {
        this.milliseconds = milliseconds;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }
}
