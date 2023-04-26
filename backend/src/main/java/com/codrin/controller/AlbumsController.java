package com.codrin.controller;

import com.codrin.model.Album;
import com.codrin.model.Response.AlbumResponse;
import com.codrin.model.Request.NewAlbumRequest;
import com.codrin.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/albums")
public class AlbumsController {
    private final AlbumService albumService;

    @Autowired
    public AlbumsController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    public ResponseEntity<List<AlbumResponse>> getAlbumList() {
        return new ResponseEntity<>(albumService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Album> getAlbum(@PathVariable("id") int id) {
        var album = albumService.getById(id);
        if(album != null)
            return new ResponseEntity<>(album, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping()
    public ResponseEntity<Album> addAlbum(@RequestBody NewAlbumRequest request) {

        var album = albumService.addAlbum(request);
        if(album == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(album, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Album> updateAlbum(@PathVariable("id") int id, @RequestBody NewAlbumRequest request) {
        var album = albumService.updateAlbum(id,request);
        if(album == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(album, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteAbum(@PathVariable("id") int id) {
        var deleted = albumService.deleteAlbum(id);
        if(deleted)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
