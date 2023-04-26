package com.codrin.model;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public
class TrackPlaylistKey implements Serializable {

    @Column(name = "track_id")
    public int trackId;

    @Column(name = "playlist_id")
    public int playlistId;

    public int getTrackId() {
        return trackId;
    }

    public void setTrackId(int trackId) {
        this.trackId = trackId;
    }

    public int getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(int playlistId) {
        this.playlistId = playlistId;
    }

    public TrackPlaylistKey() {
    }

    public TrackPlaylistKey(int trackId, int playlistId) {
        this.trackId = trackId;
        this.playlistId = playlistId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrackPlaylistKey that = (TrackPlaylistKey) o;
        return Objects.equals(trackId, that.trackId) && Objects.equals(playlistId, that.playlistId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(trackId, playlistId);
    }
}