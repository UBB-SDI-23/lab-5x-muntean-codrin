import { useEffect, useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { checkLoggedIn, getEmail, getRole } from "../authService";

const PlaylistAdd = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
    setEmail(getEmail());
    setRole(getRole());
  }, []);


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
      {isLoggedIn && (
        <>
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
        </>)}
      {!isLoggedIn && (<p>Log in to access this page</p>)}
    </Container>
  );
};

export default PlaylistAdd;