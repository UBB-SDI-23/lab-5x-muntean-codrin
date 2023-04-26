import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import {useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Artist from "../../models/Artist";

export const ArtistsAdd = () => {
    const navigate = useNavigate();

    const [artist, setArtist] = useState<Artist>({
        name: "",
        description: "",
        websiteLink: "",
        debutYear: 1900,
        profilePictureUrl: ""
    });

    const addArtist = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/artists`, artist);
            navigate("/artists");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artists`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addArtist}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, name: event.target.value })}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, description: event.target.value })}
                        />
                        <TextField
                            id="websiteLink"
                            label="websiteLink"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, websiteLink: event.target.value})}
                        />
                        <TextField
                            id="debutYear"
                            label="Debut Year"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, debutYear: parseInt(event.target.value)})}
                        />
                        <TextField
                            id="profilePictureUrl"
                            label="Profile Picture Url"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, profilePictureUrl: event.target.value })}
                        />

                        <Button type="submit">Add Artist</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};