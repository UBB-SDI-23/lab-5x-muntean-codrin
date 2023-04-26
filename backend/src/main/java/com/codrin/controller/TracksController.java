package com.codrin.controller;

import com.codrin.model.Request.NewTrackRequest;
import com.codrin.model.Track;
import com.codrin.model.Response.TrackResponse;
import com.codrin.service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tracks")
public class TracksController {
    private final TrackService trackService;

    @Autowired
    public TracksController(TrackService trackService) {
        this.trackService = trackService;
    }

    @GetMapping
    public ResponseEntity<List<TrackResponse>> getTrackList() {
        return new ResponseEntity<>(trackService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Track> getTrack(@PathVariable("id") int id) {
        var track = trackService.getById(id);
        if(track != null)
            return new ResponseEntity<>(track, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping()
    public ResponseEntity<Track> addTrack(@RequestBody NewTrackRequest request) {
        Track track = trackService.addTrack(request);
        if(track == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(track, HttpStatus.CREATED);
    }

    @PostMapping("/addMore")
    public ResponseEntity<List<Track>> addTracks(@RequestBody List<NewTrackRequest> requests)
    {
        List<Track> tracks = new ArrayList<>();
        for (NewTrackRequest request : requests)
        {
            Track track = trackService.addTrack(request);
            if(track != null)
                tracks.add(track);
        }

        return new ResponseEntity<>(tracks, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Track> updateTrack(@PathVariable("id") int id, @RequestBody NewTrackRequest request) {
        var track = trackService.updateTrack(id,request);
        if(track == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(track, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteTrack(@PathVariable("id") int id) {
        var deleted = trackService.deleteTrack(id);
        if(deleted)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
