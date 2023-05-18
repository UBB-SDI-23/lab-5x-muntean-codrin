import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { checkLoggedIn, getEmail, getRole } from "../authService";
import { useState, useEffect } from "react";

export const PlaylistDelete = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [addedBy, setAddedBy] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
    setEmail(getEmail());
    setRole(getRole());

    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/playlists/${playlistId}`);
        setAddedBy(response.data.addedBy)
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };
    fetchPlaylist();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.delete(`${BACKEND_API_URL}/playlists/${playlistId}`, { headers: headers });
    navigate("/playlists");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/playlists");
  };

  return (
    <Container>
      {!isLoggedIn && <p>Log in to access this page</p>}
      {isLoggedIn && !(addedBy === email || role === "Admin" || role === "Moderator") && (
        <p>You don't have permission to delete this playlist.</p>
      )}
      {isLoggedIn && (addedBy === email || role === "Admin" || role === "Moderator") && (
        <>
          <Card>
            <CardContent>
              <IconButton component={Link} sx={{ mr: 3 }} to={`/playlists`}>
                <ArrowBackIcon />
              </IconButton>{" "}
              Are you sure you want to delete this playlist?
            </CardContent>
            <CardActions>
              <Button onClick={handleDelete}>Delete it</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </CardActions>
          </Card>
        </>
      )}
    </Container>
  );
};

export default PlaylistDelete;
