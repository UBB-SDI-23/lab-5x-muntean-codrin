import { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { useParams, useNavigate } from "react-router-dom";
import { checkLoggedIn, getEmail, getRole } from "../authService";

const ArtistEdit = () => {
    const { artistId } = useParams();
    const [artistData, setArtistData] = useState({
        name: "",
        description: "",
        websiteLink: "",
        debutYear: "",
        profilePictureUrl: "",
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
        const fetchArtistData = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_URL}/artists/${artistId}`);
                const { name, description, websiteLink, debutYear, profilePictureUrl } = response.data;
                setArtistData({
                    name,
                    description,
                    websiteLink,
                    debutYear,
                    profilePictureUrl,
                });
                setAddedBy(response.data.addedBy);
            } catch (error) {
                console.log(error);
                // Handle error
            }
        };

        fetchArtistData();
    }, [artistId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setArtistData((prevData) => ({
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
        if (!artistData.name || artistData.name.length < 3) {
            validationErrors.name = "Artist name must be at least 3 characters long.";
        }
        if (!artistData.description) {
            validationErrors.description = "Description is required.";
        }
        if (!artistData.websiteLink) {
            validationErrors.websiteLink = "Website link is required.";
        }
        if (!artistData.debutYear || artistData.debutYear < 1900) {
            validationErrors.debutYear = "Debut year must be greater than 1900.";
        }
        if (!artistData.profilePictureUrl) {
            validationErrors.profilePictureUrl = "Profile picture URL is required.";
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
            const response = await axios.put(`${BACKEND_API_URL}/artists/${artistId}`, artistData, {
                headers: headers,
            });
            navigate("/artists");
            // Handle success or navigate to another page
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    return (
        <Container>
            {!isLoggedIn && (<p>Log in to access this page</p>)}
            {isLoggedIn && !(addedBy === email || role === "Admin" || role == "Moderator") && (<p>You dont have permission to edit this.</p>)}
            {isLoggedIn && (addedBy === email || role === "Admin" || role == "Moderator") && (
                <>
                    <h1>Edit Artist</h1>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Artist Name"
                            name="name"
                            value={artistData.name}
                            onChange={handleInputChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                            sx={{ mb: 2 }}
                        />
                        <br />
                        <TextField
                            label="Description"
                            name="description"
                            value={artistData.description}
                            onChange={handleInputChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            required
                            sx={{ mb: 2 }}
                        />
                        <br />
                        <TextField
                            label="Website Link"
                            name="websiteLink"
                            value={artistData.websiteLink}
                            onChange={handleInputChange}
                            error={!!errors.websiteLink}
                            helperText={errors.websiteLink}
                            required
                            sx={{ mb: 2 }}
                        />
                        <br />
                        <TextField
                            type="number"
                            label="Debut Year"
                            name="debutYear"
                            value={artistData.debutYear}
                            onChange={handleInputChange}
                            error={!!errors.debutYear}
                            helperText={errors.debutYear}
                            required
                            sx={{ mb: 2 }}
                        />
                        <br />
                        <TextField
                            label="Profile Picture URL"
                            name="profilePictureUrl"
                            value={artistData.profilePictureUrl}
                            onChange={handleInputChange}
                            error={!!errors.profilePictureUrl}
                            helperText={errors.profilePictureUrl}
                            required
                            sx={{ mb: 2 }}
                        />
                        <br />
                        <Button type="submit">Save Changes</Button>
                    </form>
                </>)}
        </Container>
    );
};

export default ArtistEdit;