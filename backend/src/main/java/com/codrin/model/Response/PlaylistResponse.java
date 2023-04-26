package com.codrin.model.Response;

import java.util.List;

public class PlaylistResponse {
    private int id;

    private String name;
    private List<TrackResponse> trackList;

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

    public List<TrackResponse> getTrackList() {
        return trackList;
    }

    public void setTrackList(List<TrackResponse> trackList) {
        this.trackList = trackList;
    }
}
