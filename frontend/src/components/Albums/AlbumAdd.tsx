import { useEffect, useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { checkLoggedIn, getEmail, getRole } from "../authService";

const AlbumAdd = () => {
  const [albumData, setAlbumData] = useState({
    title: "",
    artistId: "",
    releaseDate: new Date().toISOString().split("T")[0], // Get the date in "YYYY-MM-DD" format
    coverImageUrl: ""
  });
  const [errors, setErrors] = useState({});
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
    const { name, value } = event.target;
    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

    // Validate fields
    if (albumData.title.length < 3) {
      validationErrors.title = "Album title must be at least 3 characters long.";
    }
    if (!albumData.artistId) {
      validationErrors.artistId = "Artist ID is required.";
    }
    if (!albumData.releaseDate) {
      validationErrors.releaseDate = "Release Date is required.";
    }
    if (!albumData.coverImageUrl) {
      validationErrors.coverImageUrl = "Cover Image URL is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_API_URL}/albums`, albumData);
      navigate("/albums");
      // Handle success or navigate to another page
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          artistId: "Artist ID does not exist."
        }));
      } else {
        console.log(error);
        // Handle other errors
      }
    }
  };

  return (
    <Container>

      {isLoggedIn && (
        <>
          <h1>Add New Album</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Album Title"
              name="title"
              value={albumData.title}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
              sx={{ mb: 2 }}
            />
            <br />
            <TextField
              label="Artist ID"
              name="artistId"
              value={albumData.artistId}
              onChange={handleInputChange}
              error={!!errors.artistId}
              helperText={errors.artistId}
              sx={{ mb: 2 }}
            />
            <br />
            <TextField
              type="date"
              label="Release Date"
              name="releaseDate"
              value={albumData.releaseDate}
              onChange={handleInputChange}
              error={!!errors.releaseDate}
              helperText={errors.releaseDate}
              sx={{ mb: 2 }}
            />
            <br />
            <TextField
              label="Cover Image URL"
              name="coverImageUrl"
              value={albumData.coverImageUrl}
              onChange={handleInputChange}
              error={!!errors.coverImageUrl}
              helperText={errors.coverImageUrl}
              sx={{ mb: 2 }}
            />
            <br />
            <Button type="submit">Add Album</Button>
          </form>
        </>
      )}
      {!isLoggedIn && ( <p>Log in to access this page</p> )}
    </Container>

  );
};

export default AlbumAdd;
