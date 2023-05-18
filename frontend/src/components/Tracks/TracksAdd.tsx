import { useEffect, useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { checkLoggedIn, getEmail, getRole } from "../authService";

const TrackAdd = () => {
  const [trackData, setTrackData] = useState({
    name: "",
    albumId: "",
    composer: "",
    milliseconds: "",
    releaseDate: new Date().toISOString().split("T")[0], // Get the date in "YYYY-MM-DD" format
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
    setTrackData((prevData) => ({
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
    if (!trackData.name) {
      validationErrors.name = "Track name is required.";
    }
    if (!trackData.albumId) {
      validationErrors.albumId = "Album ID is required.";
    }
    if (!trackData.composer) {
      validationErrors.composer = "Composer is required.";
    }
    if (!trackData.milliseconds || trackData.milliseconds < 100 || trackData.milliseconds > 10000) {
      validationErrors.milliseconds = "Milliseconds should be between 100 and 10000.";
    }
    if (!trackData.releaseDate) {
      validationErrors.releaseDate = "Release Date is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_API_URL}/tracks`, trackData);
      navigate("/tracks");
      // Handle success or navigate to another page
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          albumId: "Album ID does not exist."
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
          <h1>Add New Track</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Track Name"
              name="name"
              value={trackData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <br />
            <TextField
              label="Album ID"
              name="albumId"
              value={trackData.albumId}
              onChange={handleInputChange}
              error={!!errors.albumId}
              helperText={errors.albumId}
            />
            <br />
            <TextField
              label="Composer"
              name="composer"
              value={trackData.composer}
              onChange={handleInputChange}
              error={!!errors.composer}
              helperText={errors.composer}
            />
            <br />
            <TextField
              type="number"
              label="Milliseconds"
              name="milliseconds"
              value={trackData.milliseconds}
              onChange={handleInputChange}
              error={!!errors.milliseconds}
              helperText={errors.milliseconds}
            />
            <br />
            <TextField
              type="date"
              label="Release Date"
              name="releaseDate"
              value={trackData.releaseDate}
              onChange={handleInputChange}
              error={!!errors.releaseDate}
              helperText={errors.releaseDate}
            />
            <br />
            <Button type="submit">Add Track</Button>
          </form>
        </>)}
      {!isLoggedIn && (<p>Log in to access this page</p>)}
    </Container>
  );
};

export default TrackAdd;