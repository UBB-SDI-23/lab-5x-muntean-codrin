import { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { checkLoggedIn, getEmail, getRole } from "../authService";

const TrackEdit = () => {
  const { trackId } = useParams();
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
  const [addedBy, setAddedBy] = useState("");

  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
    setEmail(getEmail());
    setRole(getRole());
    // Fetch track data from backend and set the initial values
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/tracks/${trackId}`);
        const trackData = response.data;
        setTrackData({
          name: trackData.name,
          albumId: trackData.albumId,
          composer: trackData.composer,
          milliseconds: trackData.milliseconds.toString(),
          releaseDate: trackData.releaseDate.split("T")[0],
        });
        setAddedBy(trackData.addedBy);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchTrack();
  }, [trackId]);

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
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(`${BACKEND_API_URL}/tracks/${trackId}`, trackData, {headers: headers});
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
      {!isLoggedIn && (<p>Log in to access this page</p>)}
      {isLoggedIn && !(addedBy === email || role === "Admin" || role == "Moderator") && (<p>You dont have permission to edit this.</p>)}
      {isLoggedIn && (addedBy === email || role === "Admin" || role == "Moderator") &&  (
        <>
      <h1>Edit Track</h1>
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
        <Button type="submit">Save Changes</Button>
      </form>
      </>)}
    </Container>
  );
};

export default TrackEdit;

