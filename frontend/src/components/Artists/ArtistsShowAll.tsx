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
    TablePagination,
    Box,
    Pagination
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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
        updateUrlParams(newPage, pageSize);
        setLoading(true);
        fetch(`${BACKEND_API_URL}/artists?pageNumber=${newPage}&pageSize=${pageSize}`)
            .then((response) => response.json())
            .then((data) => {
                setArtists(data.data);
                setTotalPages(data.totalPages);
                setTotalRecords(data.totalRecords);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPageSize = parseInt(event.target.value);
        setPageSize(newPageSize);
        setPage(1);
        updateUrlParams(1, newPageSize);

        fetch(`${BACKEND_API_URL}/artists?pageNumber=1&pageSize=${newPageSize}`)
            .then((response) => response.json())
            .then((data) => {
                setArtists(data.data);
                setTotalPages(data.totalPages);
                setTotalRecords(data.totalRecords);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const updateUrlParams = (pageNumber: number, pageSize: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set('pageNumber', pageNumber.toString());
        url.searchParams.set('pageSize', pageSize.toString());
        window.history.replaceState({}, '', url);
    };


    const handleYearFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYearFilter(event.target.value);
    };
    const handleYearFilterSubmit = () => {
        setLoading(true);
        try {
            fetch(`${BACKEND_API_URL}/artists?year=${yearFilter}&pageNumber=${page}&pageSize=${pageSize}`)
                .then((response) => response.json())
                .then((data) => {
                    setArtists(data.data);
                    setTotalPages(data.totalPages);
                    setTotalRecords(data.totalRecords);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        try {
            const url = new URL(window.location.href);
            const pageNumber = parseInt(url.searchParams.get('pageNumber') || '1');
            const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

            fetch(`${BACKEND_API_URL}/artists?pageNumber=${pageNumber}&pageSize=${pageSize}`)
                .then((response) => response.json())
                .then((data) => {
                    setArtists(data.data);
                    setTotalPages(data.totalPages);
                    setTotalRecords(data.totalRecords);
                    setLoading(false);
                    setPage(pageNumber);
                    setPageSize(pageSize);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
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

                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Desc</TableCell>
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
                                <TableCell align="center">Albums count</TableCell>
                                <TableCell align="center">Added by</TableCell>
                                <TableCell align="center">Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {artists.map((artist, index) => (
                                <TableRow key={artist.id}>
                                    <TableCell component="th" scope="row">
                                        {artist.id}
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
                                    <TableCell align="right">{artist.albumsCount}</TableCell>
                                    <TableCell align="right">
                                        <Link to={`/user/${artist.addedBy.replace('.', ',')}`}>{artist.addedBy}</Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/artists/${artist.id}/details`}>
                                            <Tooltip title="View artist details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        count={Math.ceil(totalRecords / pageSize)}
                        page={page}
                        onChange={handleChangePage}
                        showFirstButton
                        showLastButton
                    />
                </TableContainer>
            )}
        </Container>
    );
}