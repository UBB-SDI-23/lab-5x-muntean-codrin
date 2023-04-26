package com.codrin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Album {
    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private String title;

    private String description;

    @ManyToOne( targetEntity=Artist.class )
    private Artist artist;

    private Date releaseDate;

    private String coverImageUrl;

    public Album(String title, String description, Date releaseDate, String coverImageUrl) {
        this.title = title;
        this.description = description;
        this.releaseDate = releaseDate;
        this.coverImageUrl = coverImageUrl;
    }

    public Album(int id, String title)
    {
        this.id = id;
        this.title = title;
    }

    public Album() {
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

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
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
