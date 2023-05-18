import './App.css'
import { ArtistsShowAll } from './components/Artists/ArtistsShowAll'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppHome } from './components/AppHome';
import { AppMenu } from './components/AppMenu';
import { ArtistsDelete } from './components/Artists/ArtistsDelete';
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
import PlaylistAdd from './components/Playlists/PlaylistAdd';
import AlbumAdd from './components/Albums/AlbumAdd';
import TrackAdd from './components/Tracks/TracksAdd';
import ArtistAdd from './components/Artists/ArtistsAdd';
import PlaylistEdit from './components/Playlists/PlaylistEdit';
import TrackEdit from './components/Tracks/TracksEdit';
import AlbumEdit from './components/Albums/AlbumEdit';
import ArtistEdit from './components/Artists/ArtistsEdit';
import { ArtistsShowSongsCount } from './components/Artists/ArtistsShowSongsCount ';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import { UsersShowAll } from './components/Users/UsersShowAll';

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
        <AppMenu />
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/artists" element={<ArtistsShowAll />} />
          <Route path="/artists/add" element={<ArtistAdd />} />
          <Route path="/artists/:artistId/delete" element={<ArtistsDelete />} />
          <Route path="/artists/:artistId/edit" element={< ArtistEdit/>} />
          <Route path="/artists/:artistId/details" element={<ArtistsDetails />} />

          <Route path="/albums" element={<AlbumsShowAll />} />
          <Route path="/albums/add" element={<AlbumAdd />} />
          <Route path="/albums/:albumId/edit" element={<AlbumEdit />} />
          <Route path="/albums/:albumId/details" element={<AlbumDetails />} />
          <Route path="/albums/:albumId/delete" element={<AlbumDelete />} />

          <Route path="/tracks" element={<TracksShowAll />} />
          <Route path="/tracks/add" element={<TrackAdd />} />
          <Route path="/tracks/:trackId/edit" element={<TrackEdit />} />
          <Route path="/tracks/:trackId/details" element={<TrackDetails />} />
          <Route path="/tracks/:trackId/delete" element={<TrackDelete />} />

          <Route path="/playlists" element={<PlaylistsShowAll />} />
          <Route path="/playlists/add" element={<PlaylistAdd />} />
          <Route path="/playlists/:playlistId/edit" element={<PlaylistEdit />} />
          <Route path="/playlists/:playlistId/details" element={<PlaylistDetails />} />
          <Route path="/playlists/:playlistId/delete" element={<PlaylistDelete />} />

          <Route path="/playlists/length" element={<PlaylistsShowLength />} />
          <Route path="/artists/songs" element={<ArtistsShowSongsCount />} />

          <Route path="/user/:email" element={<UserProfilePage />} />
          <Route path="/users" element={<UsersShowAll />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
