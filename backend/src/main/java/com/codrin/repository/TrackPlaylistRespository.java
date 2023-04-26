package com.codrin.repository;

import com.codrin.model.TrackPlaylist;
import com.codrin.model.TrackPlaylistKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackPlaylistRespository extends JpaRepository<TrackPlaylist, TrackPlaylistKey> {
}

