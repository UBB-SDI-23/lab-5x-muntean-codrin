import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { checkLoggedIn, getEmail, getRole } from "../authService";
import { useEffect, useState } from "react";

export const AlbumDelete = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [addedBy, setAddedBy] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
    setEmail(getEmail());
    setRole(getRole());

    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/albums/${albumId}`);
        setAddedBy(response.data.addedBy)
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };
    fetchAlbum();
  }, []);


  const handleDelete = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    await axios.delete(`${BACKEND_API_URL}/albums/${albumId}`, {headers: headers});
    navigate("/albums");
  };

  const handleCancel = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate("/albums");
  };

  return (
    <Container>
      {!isLoggedIn && (<p>Log in to access this page</p>)}
      {isLoggedIn && !(addedBy === email || role === "Admin" || role == "Moderator") && (<p>You dont have permission to edit this.</p>)}
      {isLoggedIn && (addedBy === email || role === "Admin" || role == "Moderator") &&  (
        <>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/albums`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          Are you sure you want to delete this Album?
        </CardContent>
        <CardActions>
          <Button onClick={handleDelete}>Delete it</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </CardActions>
      </Card></>)}
    </Container>
  );
};

export default AlbumDelete;