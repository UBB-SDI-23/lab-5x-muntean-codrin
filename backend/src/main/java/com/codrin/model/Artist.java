package com.codrin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Artist {
    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private String name;

    private String description;

    private String websiteLink;

    @Min(1800)
    private int debutYear;

    private String profilePictureUrl;

    public Artist(String name, String description, String websiteLink, int debutYear, String profilePictureUrl) {
        this.name = name;
        this.description = description;
        this.websiteLink = websiteLink;
        this.debutYear = debutYear;
        this.profilePictureUrl = profilePictureUrl;
    }

    public Artist(int id, String name, int debutYear)
    {
        this.id = id;
        this.name = name;
        this.debutYear = debutYear;
    }

    public Artist() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsiteLink() {
        return websiteLink;
    }

    public void setWebsiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
    }

    public int getDebutYear() {
        return debutYear;
    }

    public void setDebutYear(int debutYear) {
        this.debutYear = debutYear;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }


}
