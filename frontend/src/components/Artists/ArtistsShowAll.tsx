import Artist from "../../models/Artist";

import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Button,
    TableSortLabel,
    TextField,
} from "@mui/material";

import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";


import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../constants";


export const ArtistsShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [yearFilter, setYearFilter] = useState("");

    const handleYearFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYearFilter(event.target.value);
    };

    const handleYearFilterSubmit = () => {
        setLoading(true);
        try {
            fetch(`${BACKEND_API_URL}/artists?year=${yearFilter}`)
                .then((response) => response.json())
                .then((data) => {
                    setArtists(data['data']);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        try {
            fetch(`${BACKEND_API_URL}/artists`)
                .then((response) => response.json())
                .then((data) => {
                    setArtists(data['data']);
                    setLoading(false);
                })
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    const handleSort = () => {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);

        const sortedArtists = [...artists].sort((a, b) => {
            if (newDirection === "asc") {
                return a.debutYear - b.debutYear;
            } else {
                return b.debutYear - a.debutYear;
            }
        });
        setArtists(sortedArtists);
    }

    return (
        <Container sx={{ padding: '2em' }}>
            <h1>Artists</h1>




            {loading && <CircularProgress />}
            {!loading && artists.length === 0 && <p>No artists found</p>}
            {!loading && (


                <Container>
                    <TextField
                        label="Debut year filter"
                        value={yearFilter}
                        onChange={handleYearFilterChange}
                        variant="outlined"
                    />
                    <Button variant="contained" onClick={handleYearFilterSubmit}>
                        Filter
                    </Button>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artists/add`}>
                        <Tooltip title={"Add a new artist"} arrow>
                            <AddIcon color="primary" />
                        </Tooltip>
                    </IconButton>
                </Container>
            )}
            {!loading && artists.length > 0 && (

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Website link</TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={handleSort}
                                    >
                                        Debut Year
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">Profile Picture Url</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {artists.map((artist, index) => (
                                <TableRow key={artist.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/artists/${artist.id}/details`} title={"View artist details"}>
                                            {artist.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{artist.description}</TableCell>
                                    <TableCell align="right">{artist.websiteLink}</TableCell>
                                    <TableCell align="right">{artist.debutYear}</TableCell>
                                    <TableCell align="right">{artist.profilePictureUrl}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/artists/${artist.id}/details`}>
                                            <Tooltip title="View artist details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/artists/${artist.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/artists/${artist.id}/delete`}>
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}