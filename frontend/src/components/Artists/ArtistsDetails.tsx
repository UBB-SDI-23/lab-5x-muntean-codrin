import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Container } from "@mui/system";
import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Artist from "../../models/Artist";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


export const ArtistsDetails = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState<Artist>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
                    <p>artist name: {artist?.name}</p>
                    <p>artist description: {artist?.description}</p>
                    <p>artist website link: {artist?.websiteLink}</p>
                    <p>artist debut year: {artist?.debutYear}</p>
                    <p>artist profile picture url: {artist?.profilePictureUrl}</p>
                    <p>Albums:</p>
                    <ul>
                        {artist?.albumList?.map((album, index) => (
                            <CardContent key={album.id}>
                                <li>Album details</li>
                                <p>Name of album : {album?.title}</p>
                                <p>Release date : {album?.releaseDate.toString()}</p>
                                <p>Cover image url : {album?.coverImageUrl}</p>
                            </CardContent>
                        ))}
                    </ul>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artists/${artistId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artists/${artistId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};
