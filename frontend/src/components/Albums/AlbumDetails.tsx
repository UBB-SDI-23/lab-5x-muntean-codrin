import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Container } from "@mui/system";
import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Album from "../../models/Album";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { checkLoggedIn, getEmail, getRole } from "../authService";

export const AlbumDetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album>();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);


  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
    setEmail(getEmail());
    setRole(getRole());
    const url = `${BACKEND_API_URL}/albums/${albumId}`;
    const fetchAlbum = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        const album = response.data;
        setAlbum(album);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbum();
  }, [albumId]);

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/albums`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <h1>Album Details</h1>
          <p>Album Title: {album?.title}</p>
          <p>
            Artist:{" "}
            {album?.artist && (
              <Link to={`/artists/${album.artist.id}/details`}>
                {album.artist.name}
              </Link>
            )}
          </p>
          <p>Release Date: {album?.releaseDate.toString()}</p>
          <p>Cover Image URL: {album?.coverImageUrl}</p>
          <p>Added By: {album?.addedBy}</p>
        </CardContent>
        {isLoggedIn && (album?.addedBy === email || role === "Admin" || role == "Moderator") &&  (
          <CardActions>
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/albums/${albumId}/edit`}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/albums/${albumId}/delete`}
            >
              <DeleteForeverIcon sx={{ color: "red" }} />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </Container>
  );
};

export default AlbumDetails;