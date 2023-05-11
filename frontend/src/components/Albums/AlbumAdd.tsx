import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

const AlbumAdd = () => {
  const [albumData, setAlbumData] = useState({
    title: "",
    artistId: 0,
    releaseDate: new Date().toISOString(),
    coverImageUrl: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (albumData.title.length < 3) {
      setError("Album title must be at least 3 characters long.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_API_URL}/albums`, albumData);
      navigate("/albums");
      // Handle success or navigate to another page
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <Container>
      <h1>Add New Album</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Album Title"
          name="title"
          value={albumData.title}
          onChange={handleInputChange}
          error={error.length > 0}
          helperText={error}
        />
        <br />
        <TextField
          label="Artist ID"
          name="artistId"
          value={albumData.artistId}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          type="date"
          label="Release Date"
          name="releaseDate"
          value={albumData.releaseDate}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          label="Cover Image URL"
          name="coverImageUrl"
          value={albumData.coverImageUrl}
          onChange={handleInputChange}
        />
        <br />
        <Button type="submit">Add Album</Button>
      </form>
    </Container>
  );
};

export default AlbumAdd;
