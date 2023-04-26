package com.codrin.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
public class TrackPlaylist{

    @EmbeddedId
    TrackPlaylistKey id;

    @ManyToOne
    @MapsId("trackId")
    @JoinColumn(name = "track_id")
    private Track track;

    @ManyToOne
    @MapsId("playlistId")
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;

    private Date dateAdded;

    private String Note;

    public TrackPlaylist(TrackPlaylistKey trackPlaylistKey, Track track, Playlist metallica) {
        this.id = trackPlaylistKey;
        this.track = track;
        this.playlist = metallica;
    }

    public TrackPlaylist() {}

    public TrackPlaylistKey getId() {
        return id;
    }

    public void setId(TrackPlaylistKey id) {
        this.id = id;
    }

    public Track getTrack() {
        return track;
    }

    public void setTrack(Track track) {
        this.track = track;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getNote() {
        return Note;
    }

    public void setNote(String note) {
        Note = note;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrackPlaylist that = (TrackPlaylist) o;
        return Objects.equals(id, that.id) && Objects.equals(track, that.track) && Objects.equals(playlist, that.playlist) && Objects.equals(dateAdded, that.dateAdded) && Objects.equals(Note, that.Note);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, track, playlist, dateAdded, Note);
    }
}
