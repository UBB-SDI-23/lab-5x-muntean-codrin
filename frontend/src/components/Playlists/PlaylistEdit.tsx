import { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";

const PlaylistEdit = () => {
  const { playlistId } = useParams();
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch playlist data from backend and set the initial values
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/playlists/${playlistId}`);
        const playlistData = response.data;
        setPlaylistName(playlistData.name);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const handleInputChange = (event) => {
    setPlaylistName(event.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (playlistName.length < 3) {
      setError("Playlist name must be at least 3 characters long.");
      return;
    }

    try {
      const response = await axios.put(`${BACKEND_API_URL}/playlists/${playlistId}`, {
        name: playlistName,
      });
      navigate("/playlists");
      // Handle success or navigate to another page
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <Container>
      <h1>Edit Playlist</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Playlist Name"
          value={playlistName}
          onChange={handleInputChange}
          error={error.length > 0}
          helperText={error}
        />
        <br />
        <Button type="submit">Save Changes</Button>
      </form>
    </Container>
  );
};

export default PlaylistEdit;
