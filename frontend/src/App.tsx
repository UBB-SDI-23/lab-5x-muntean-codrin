import './App.css'
import { ArtistsShowAll } from './components/Artists/ArtistsShowAll'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppHome } from './components/AppHome';
import { AppMenu } from './components/AppMenu';
import { ArtistsAdd } from './components/Artists/ArtistsAdd';
import { ArtistsDelete } from './components/Artists/ArtistsDelete';
import { ArstistsEdit } from './components/Artists/ArtistsEdit';
import { ArtistsDetails } from './components/Artists/ArtistsDetails';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { PlaylistsShowLength } from './components/Playlists/PlaylistsShowLength';
import { AlbumsShowAll } from './components/Albums/AlbumsShowAll';
import { TracksShowAll } from './components/Tracks/TracksShowAll';
import { PlaylistsShowAll } from './components/Playlists/PlaylistsShowAll';
import UserProfilePage from './components/Users/ShowUserProfile';
import AlbumDetails from './components/Albums/AlbumDetails';
import TrackDetails from './components/Tracks/TracksDetails';
import PlaylistDetails from './components/Playlists/PlaylistsDetails';
import AlbumDelete from './components/Albums/AlbumsDelete';
import TracksDelete, { TrackDelete } from './components/Tracks/TracksDelete';
import { PlaylistDelete } from './components/Playlists/PlaylistsDelete';

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
        <AppMenu />
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/artists" element={<ArtistsShowAll />} />
          <Route path="/artists/add" element={<ArtistsAdd />} />
          <Route path="/artists/:artistId/delete" element={<ArtistsDelete />} />
          <Route path="/artists/:artistId/edit" element={<ArstistsEdit />} />
          <Route path="/artists/:artistId/details" element={<ArtistsDetails />} />

          <Route path="/albums" element={<AlbumsShowAll />} />
          <Route path="/albums/:albumId/details" element={<AlbumDetails />} />
          <Route path="/albums/:albumId/delete" element={<AlbumDelete />} />

          <Route path="/tracks" element={<TracksShowAll />} />
          <Route path="/tracks/:trackId/details" element={<TrackDetails />} />
          <Route path="/tracks/:trackId/delete" element={<TrackDelete />} />

          <Route path="/playlists" element={<PlaylistsShowAll />} />
          <Route path="/playlists/:playlistId/details" element={<PlaylistDetails />} />
          <Route path="/playlists/:playlistId/delete" element={<PlaylistDelete />} />

          <Route path="/user/:email" element={<UserProfilePage />} />
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
