import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import {Container} from "@mui/system";
import {Button, Card, CardContent, IconButton, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Artist from "../../models/Artist";



export const ArstistsEdit = () => {

    const navigate = useNavigate();

    const { artistId } = useParams();
    const [artist, setArtist] = useState<Artist>({
        name: "",
        description: "",
        websiteLink: "",
        debutYear: 1900,
        profilePictureUrl: ""
    });

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const url = `${BACKEND_API_URL}/artists/${artistId}`
        const axiosartist = async () => {
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
        axiosartist();

    }, [artistId]);

    const updateArtist = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            setArtist(artist);
            const response = await axios.put(`${BACKEND_API_URL}/artists/${artistId}`, artist);
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
                    <h1>Artist Details</h1>
                    <p>artist name: {artist?.name}</p>
                    <p>artist description: {artist?.description}</p>
                    <p>artist website link: {artist?.websiteLink}</p>
                    <p>artist debut year: {artist?.debutYear}</p>
                    <p>artist profile picture url: {artist?.profilePictureUrl}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <form onSubmit={updateArtist}>
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
                            label="description"
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
                            label="debutYear"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, debutYear: parseInt(event.target.value )})}
                        />
                        <TextField
                            id="profilePictureUrl"
                            label="profilePictureUrl"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, profilePictureUrl: event.target.value })}
                        />

                        <Button type="submit">Update artist</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};
