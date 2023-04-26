package com.codrin.model.Response;

import com.codrin.model.Artist;

import java.util.List;

public class ArtistResponse {
    private int id;

    private String name;

    private String description;

    private String websiteLink;

    private int debutYear;

    private String profilePictureUrl;

    private List<AlbumResponse> albumList;

    public List<AlbumResponse> getAlbumList() {
        return albumList;
    }

    public void setAlbumList(List<AlbumResponse> albumList) {
        this.albumList = albumList;
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

    public ArtistResponse(Artist artist, List<AlbumResponse> albumList) {
        id = artist.getId();
        name =artist.getName();
        description = artist.getDescription();
        websiteLink = artist.getWebsiteLink();
        debutYear = artist.getDebutYear();
        profilePictureUrl =artist.getProfilePictureUrl();
        this.albumList = albumList;
    }


}
