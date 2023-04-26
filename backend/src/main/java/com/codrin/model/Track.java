package com.codrin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;
import java.util.Date;

@Entity
public class Track implements Serializable {
    @Id
    @GeneratedValue
    private int id;

    private String name;

    @ManyToOne
    private Album album;

    private String composer;

    private int milliseconds;

    private Date releaseDate;

    public Track(int id, String name, String composer, int milliseconds, Date releaseDate) {
        this.id = id;
        this.name = name;
        this.composer = composer;
        this.milliseconds = milliseconds;
        this.releaseDate = releaseDate;
    }

    public Track() {}

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

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
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
