package com.codrin.service;

import com.codrin.model.*;
import com.codrin.model.Request.NewTrackRequest;
import com.codrin.model.Response.TrackResponse;
import com.codrin.repository.AlbumRepository;
import com.codrin.repository.PlaylistRepository;
import com.codrin.repository.TrackPlaylistRespository;
import com.codrin.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class TrackService {
    @Autowired
    private TrackRepository trackRepository;

    @Autowired
    private AlbumRepository albumRepository;


    public List<TrackResponse> getAll()
    {
        var tracks = trackRepository.findAll();
        var trackResponses = new ArrayList<TrackResponse>();
        for (var track : tracks) {
            trackResponses.add(new TrackResponse(track));
        }
        return trackResponses;
    }

    public Track getById(int id) {
        return trackRepository.findById(id).orElse(null);
    }

    public Track addTrack(NewTrackRequest request)
    {
        var album = albumRepository.findById(request.albumId()).orElse(null);
        if(album == null)
            return null;

        Track track = new Track();
        track.setAlbum(album);
        track.setComposer(request.composer());
        track.setName(request.name());
        track.setMilliseconds(request.milliseconds());
        track.setReleaseDate(request.releaseDate());
        trackRepository.save(track);

        return track;
    }

    public Track updateTrack(int id, NewTrackRequest request)
    {
        var track = trackRepository.findById(id).orElse(null);
        if(track == null)
            return null;

        var album = albumRepository.findById(request.albumId()).orElse(null);
        if(album == null)
            return null;

        track.setAlbum(album);
        track.setComposer(request.composer());
        track.setName(request.name());
        track.setMilliseconds(request.milliseconds());
        track.setReleaseDate(request.releaseDate());
        trackRepository.save(track);

        return track;
    }

    public boolean deleteTrack(int id)
    {
        var track = trackRepository.findById(id).orElse(null);
        if(track == null)
            return false;

        trackRepository.delete(track);
        return true;
    }


}
