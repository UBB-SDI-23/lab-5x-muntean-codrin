import { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkLoggedIn, getEmail, getRole } from "../authService";

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [addedBy, setAddedBy] = useState("");

    useEffect(() => {
        setIsLoggedIn(checkLoggedIn());
        setEmail(getEmail());
        setRole(getRole());
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
            setAddedBy(response.data.addedBy)
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
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.put(`${BACKEND_API_URL}/albums/${albumId}`, albumData, {headers: headers});
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
            {!isLoggedIn && (<p>Log in to access this page</p>)}
            {isLoggedIn && !(addedBy === email || role === "Admin" || role == "Moderator") && (<p>You dont have permission to edit this.</p>)}
            {isLoggedIn && (addedBy === email || role === "Admin" || role == "Moderator") && (
                <>
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
                </>)}
        </Container>
    );
};

export default AlbumEdit;

