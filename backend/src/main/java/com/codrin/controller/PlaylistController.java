package com.codrin.controller;

import com.codrin.model.Request.NewPlaylistRequest;
import com.codrin.model.Playlist;
import com.codrin.model.Response.PlaylistResponse;
import com.codrin.model.Statistics.PlaylistLength;
import com.codrin.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {
    private final PlaylistService playlistService;

    @Autowired
    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping
    public ResponseEntity<List<Playlist>> getPlaylistList() {
        return new ResponseEntity<>(playlistService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<PlaylistResponse> getPlaylist(@PathVariable("id") int id) {
        var playlist = playlistService.getById(id);
        if(playlist != null)
            return new ResponseEntity<>(playlist, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Playlist> addPlaylist(@RequestBody NewPlaylistRequest request) {
        Playlist playlist = playlistService.addPlaylist(request);
        if(playlist == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(playlist, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Playlist> updatePlaylist(@PathVariable("id") int id, @RequestBody NewPlaylistRequest request) {
        var playlist = playlistService.updatePlaylist(id,request);
        if(playlist == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(playlist, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deletePlaylist(@PathVariable("id") int id) {
        var deleted = playlistService.deletePlaylist(id);
        if(deleted)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/length")
    public ResponseEntity<List<PlaylistLength>> getPlaylistLength() {
        var playlistLengths = playlistService.calculateLength();
        if(playlistLengths == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(playlistLengths, HttpStatus.OK);
    }

    @PostMapping("{id}/tracks/{trackId}")
    public ResponseEntity<HttpStatus> addTrackToPlaylist(@PathVariable("id") int id, @PathVariable("trackId") int trackId) {
        var added = playlistService.addTrackToPlaylist(trackId, id);
        if(added)
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @DeleteMapping("{id}/tracks/{trackId}")
    public ResponseEntity<HttpStatus> removeTrackFromPlaylist(@PathVariable("id") int id, @PathVariable("trackId") int trackId) {
        var removed = playlistService.removeTrackFromPlaylist(trackId, id);
        if(removed)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
