package com.codrin.controller;

import com.codrin.model.Artist;
import com.codrin.model.Response.ArtistResponse;
import com.codrin.model.Request.NewArtistRequest;
import com.codrin.model.Statistics.ArtistsSongs;
import com.codrin.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artists")
public class ArtistsController {
    private final ArtistService artistService;

    @Autowired
    public ArtistsController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping
    public ResponseEntity<List<Artist>> getArtistList(@RequestParam(required = false) Integer year) {
        if(year != null)
            return new ResponseEntity<>(artistService.getAllAfterYear(year), HttpStatus.OK);
        return new ResponseEntity<>(artistService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ArtistResponse> getArtist(@PathVariable("id") int id) {
        var artistResponse = artistService.getById(id);
        if(artistResponse != null)
            return new ResponseEntity<>(artistResponse, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping()
    public ResponseEntity<Artist> addArtist(@RequestBody NewArtistRequest request) {
        Artist artist = artistService.addArtist(request);
        return new ResponseEntity<>(artist, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Artist> updateArtist(@PathVariable("id") int id, @RequestBody NewArtistRequest request) {
        var artist = artistService.updateArtist(id,request);
        if(artist == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(artist, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteArtist(@PathVariable("id") int id) {
        var deleted = artistService.deleteArtist(id);
        if(deleted)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/songs")
    public ResponseEntity<List<ArtistsSongs>> getArtistSongs() {
        var artistSongs = artistService.getArtistsSongs();
        if(artistSongs != null)
            return new ResponseEntity<>(artistSongs, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
