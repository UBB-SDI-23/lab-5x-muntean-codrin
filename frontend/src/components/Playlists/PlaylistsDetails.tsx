import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Container } from "@mui/system";
import { Card, CardActions, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Artist from "../../models/Artist";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Track from "../../models/Track";
import Playlist from "../../models/Playlist";
import { checkLoggedIn, getEmail, getRole } from "../authService";


export const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState<Playlist>();
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        setIsLoggedIn(checkLoggedIn());
        setEmail(getEmail());
        setRole(getRole());
        const url = `${BACKEND_API_URL}/playlists/${playlistId}`;
        const fetchPlaylist = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                const playlist = response.data;
                setPlaylist(playlist);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlaylist();
    }, [playlistId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/playlists`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Playlist Details</h1>
                    <p>Playlist Name: {playlist?.name}</p>
                    <p>Added By: {playlist?.addedBy}</p>
                </CardContent>
                {isLoggedIn && (playlist?.addedBy === email || role === "Admin" || role == "Moderator") &&  (
                <CardActions>
                    <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/playlists/${playlistId}/edit`}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/playlists/${playlistId}/delete`}
                    >
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>)};
            </Card>

            {playlist && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="playlist tracks table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Track Name</TableCell>
                                <TableCell align="center">Composer</TableCell>
                                <TableCell align="center">Duration</TableCell>
                                <TableCell align="center">Release Date</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playlist.trackList.map((track, index) => (
                                <TableRow key={track.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center"><Link to={`/tracks/${track.id}/details`}>
                                        {track.name}
                                    </Link></TableCell>
                                    <TableCell align="center">{track.composer}</TableCell>
                                    <TableCell align="center">{track.milliseconds}</TableCell>
                                    <TableCell align="center">
                                        {track.releaseDate.toString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default PlaylistDetails;