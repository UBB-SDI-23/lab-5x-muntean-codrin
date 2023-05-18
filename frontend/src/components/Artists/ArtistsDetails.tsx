import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Container } from "@mui/system";
import { Card, CardActions, CardContent, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Artist from "../../models/Artist";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { checkLoggedIn, getEmail, getRole } from "../authService";


export const ArtistsDetails = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState<Artist>();
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        setIsLoggedIn(checkLoggedIn());
        setEmail(getEmail());
        setRole(getRole());
        const url = `${BACKEND_API_URL}/artists/${artistId}`
        const axiosArtist = async () => {
            setLoading(true);
            await axios.get(url)
                .then(response => {
                    const artist = response.data;
                    setArtist(artist);
                    setLoading(false);
                }, error => {
                    console.log(error);
                });
        };
        axiosArtist();

    }, [artistId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artists`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Artist Details</h1>
                    <p>Artist name: {artist?.name}</p>
                    <p>Artist description: {artist?.description}</p>
                    <p>Artist website link: {artist?.websiteLink}</p>
                    <p>Artist debut year: {artist?.debutYear}</p>
                    <p>Artist profile picture url: {artist?.profilePictureUrl}</p>
                </CardContent>
                {isLoggedIn && (artist?.addedBy === email || role === "Admin" || role == "Moderator") &&  (
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artists/${artistId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artists/${artistId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>)}
            </Card>
        </Container>
    );
};
