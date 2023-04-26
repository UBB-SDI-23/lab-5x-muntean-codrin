package com.codrin.repository;

import com.codrin.model.Album;
import com.codrin.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {

}
