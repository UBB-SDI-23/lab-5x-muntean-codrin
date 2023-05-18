import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { checkLoggedIn, getEmail, getRole } from "../authService";
import { useState, useEffect } from "react";

export const TrackDelete = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [addedBy, setAddedBy] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
    setEmail(getEmail());
    setRole(getRole());

    const fetchTrack = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/tracks/${trackId}`);
        setAddedBy(response.data.addedBy)
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };
    fetchTrack();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.delete(`${BACKEND_API_URL}/tracks/${trackId}`, {headers: headers});
    navigate("/tracks");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/tracks");
  };

  return (
    <Container>
      {!isLoggedIn && <p>Log in to access this page</p>}
      {isLoggedIn && !(addedBy === email || role === "Admin" || role === "Moderator") && (
        <p>You don't have permission to delete this track.</p>
      )}
      {isLoggedIn && (addedBy === email || role === "Admin" || role === "Moderator") && (
        <Card>
          <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/tracks`}>
              <ArrowBackIcon />
            </IconButton>{" "}
            Are you sure you want to delete this track?
          </CardContent>
          <CardActions>
            <Button onClick={handleDelete}>Delete it</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default TrackDelete;
