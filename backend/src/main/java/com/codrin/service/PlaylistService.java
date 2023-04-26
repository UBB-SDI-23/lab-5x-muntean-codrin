package com.codrin.service;

import com.codrin.model.Request.NewPlaylistRequest;
import com.codrin.model.Playlist;
import com.codrin.model.Response.PlaylistResponse;
import com.codrin.model.Response.TrackResponse;
import com.codrin.model.Statistics.PlaylistLength;
import com.codrin.model.TrackPlaylist;
import com.codrin.model.TrackPlaylistKey;
import com.codrin.repository.PlaylistRepository;
import com.codrin.repository.TrackPlaylistRespository;
import com.codrin.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class PlaylistService {

    @Autowired
    private TrackRepository trackRepository;

    public void setTrackRepository(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    public void setPlaylistRepository(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    public void setTrackPlaylistRespository(TrackPlaylistRespository trackPlaylistRespository) {
        this.trackPlaylistRespository = trackPlaylistRespository;
    }

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private TrackPlaylistRespository trackPlaylistRespository;

    public List<Playlist> getAll() {
        return playlistRepository.findAll();
    }

    public PlaylistResponse getById(int id) {
        var playlist =  playlistRepository.findById(id).orElse(null);
        if(playlist == null)
            return null;

        var playlistResponse = new PlaylistResponse();
        playlistResponse.setId(playlist.getId());
        playlistResponse.setName(playlist.getName());
        var tracks = trackPlaylistRespository.findAll().stream().filter(x -> x.getPlaylist().getId() == id).map(x -> x.getTrack()).toList();
        var trackResponses = new ArrayList<TrackResponse>();
        for(var track : tracks)
        {
            var trackResponse = new TrackResponse();
            trackResponse.setId(track.getId());
            trackResponse.setName(track.getName());
            trackResponse.setComposer(track.getComposer());
            trackResponse.setMilliseconds(track.getMilliseconds());
            trackResponse.setAlbumId(track.getAlbum().getId());
            trackResponses.add(trackResponse);

        }
        playlistResponse.setTrackList(trackResponses);
        return playlistResponse;
    }

    public Playlist addPlaylist(NewPlaylistRequest request) {
        Playlist playlist = new Playlist();
        playlist.setName(request.name());
        playlistRepository.save(playlist);
        return playlist;
    }

    public Playlist updatePlaylist(int id, NewPlaylistRequest request) {
        var playlist = playlistRepository.findById(id).orElse(null);
        if(playlist == null)
            return null;
        playlist.setName(request.name());
        playlistRepository.save(playlist);
        return playlist;
    }

    public boolean deletePlaylist(int id) {
        var exists = playlistRepository.existsById(id);
        if(exists)
            playlistRepository.deleteById(id);
        return exists;
    }

    public boolean addTrackToPlaylist(int trackId, int playlistId)
    {
        var track = trackRepository.findById(trackId).orElse(null);
        if(track == null)
            return false;

        var playlist = playlistRepository.findById(playlistId).orElse(null);
        if(playlist == null)
            return false;

        var trackPlaylist = new TrackPlaylist();
        trackPlaylist.setTrack(track);
        trackPlaylist.setPlaylist(playlist);
        trackPlaylist.setId(new TrackPlaylistKey(trackId, playlistId));
        trackPlaylistRespository.save(trackPlaylist);

        return true;
    }


    public List<PlaylistLength> calculateLength()
    {
        var playlists = playlistRepository.findAll();
        var playlistLengths = new ArrayList<PlaylistLength>();
        for (var playlist : playlists) {
            var tracks = trackPlaylistRespository.findAll().stream().filter(x -> x.getPlaylist().getId() == playlist.getId()).map(x -> x.getTrack()).toList();
            var length = 0;
            for (var track : tracks){
                length+= track.getMilliseconds();
            }
            var playlistLength = new PlaylistLength();
            playlistLength.setPlaylistId(playlist.getId());
            playlistLength.setPlaylistLength(length);
            playlistLength.setPlaylistName(playlist.getName());
            playlistLengths.add(playlistLength);
        }

        return playlistLengths;
    }

    public boolean removeTrackFromPlaylist(int trackId, int playlistId)
    {
        var trackPlaylist = trackPlaylistRespository.findById(new TrackPlaylistKey(trackId, playlistId)).orElse(null);
        if(trackPlaylist == null)
            return false;
        trackPlaylistRespository.delete(trackPlaylist);
        return true;
    }
}
