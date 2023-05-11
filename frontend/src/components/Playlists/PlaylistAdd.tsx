import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Link, useNavigate} from "react-router-dom";

const PlaylistAdd = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const response = await axios.post(`${BACKEND_API_URL}/playlists`, {
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
      <h1>Add New Playlist</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Playlist Name"
          value={playlistName}
          onChange={handleInputChange}
          error={error.length > 0}
          helperText={error}
        />
        <br />
        <Button type="submit">Add Playlist</Button>
      </form>
    </Container>
  );
};

export default PlaylistAdd;