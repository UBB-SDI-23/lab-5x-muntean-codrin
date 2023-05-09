import './App.css'
import { ArtistsShowAll } from './components/Artists/ArtistsShowAll'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from './components/AppHome';
import { AppMenu } from './components/AppMenu';
import { ArtistsAdd } from './components/Artists/ArtistsAdd';
import { ArtistsDelete } from './components/Artists/ArtistsDelete';
import { ArstistsEdit } from './components/Artists/ArtistsEdit';
import { ArtistsDetails } from './components/Artists/ArtistsDetails';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { PlaylistsShowLength } from './components/Playlists/PlaylistsShowLength';

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
        <AppMenu />
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/artists" element={<ArtistsShowAll />} />
          <Route path="/artists/add" element={<ArtistsAdd />} />
          <Route path="/artists/:artistId/delete" element={<ArtistsDelete />} />
          <Route path="/artists/:artistId/edit" element={<ArstistsEdit />} />
          <Route path="/artists/:artistId/details" element={<ArtistsDetails />} />
          <Route path="/playlists" element={<PlaylistsShowLength />} />
        </Routes>
      </Router>
      </ThemeProvider>
    </>
  )
}

export default App
