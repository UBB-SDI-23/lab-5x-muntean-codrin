import { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";

const AlbumEdit = () => {
    const { albumId } = useParams();
    const [albumData, setAlbumData] = useState({
        title: "",
        artistId: "",
        releaseDate: "",
        coverImageUrl: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbumData();
    }, []);

    const fetchAlbumData = async () => {
        try {
            const response = await axios.get(`${BACKEND_API_URL}/albums/${albumId}`);
            const { title, artistId, releaseDate, coverImageUrl } = response.data;
            setAlbumData({
                title,
                artistId,
                releaseDate,
                coverImageUrl,
            });
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAlbumData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
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
            const response = await axios.put(`${BACKEND_API_URL}/albums/${albumId}`, albumData);
            navigate("/albums");
            // Handle success or navigate to another page
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    artistId: "Artist ID does not exist.",
                }));
            } else {
                console.log(error);
                // Handle other errors
            }
        }
    };

    return (
        <Container>
            <h1>Edit Album</h1>
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
                />        <br />
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
                <Button type="submit">Save Changes</Button>
            </form>
        </Container>
    );
};

export default AlbumEdit;

