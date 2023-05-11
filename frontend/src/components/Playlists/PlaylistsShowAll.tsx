import React, { useState, useEffect } from 'react';
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
    TablePagination,
    IconButton,
    Tooltip,
} from '@mui/material';

import ReadMoreIcon from "@mui/icons-material/ReadMore";
import AddIcon from "@mui/icons-material/Add";

import { Link } from 'react-router-dom';

import { BACKEND_API_URL } from '../../constants';
import Playlist from '../../models/Playlist';

export const PlaylistsShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const url = new URL(window.location.href);
        const pageNumber = parseInt(url.searchParams.get('pageNumber') || '1');
        const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
        try {
            fetch(`${BACKEND_API_URL}/Playlists?pageNumber=${pageNumber}&pageSize=${pageSize}`)
                .then((response) => response.json())
                .then((data) => {
                    setPlaylists(data.data);
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

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage + 1);
        updateUrlParams(newPage + 1, pageSize);
        fetch(`${BACKEND_API_URL}/Playlists?pageNumber=${newPage + 1}&pageSize=${pageSize}`)
            .then((response) => response.json())
            .then((data) => {
                setPlaylists(data.data);
                setTotalPages(data.totalPages);
                setTotalRecords(data.totalRecords);
                setLoading(false);
            });
    };

    const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPageSize = parseInt(event.target.value);
        setPageSize(newPageSize);
        setPage(1);
        updateUrlParams(1, newPageSize);
        fetch(`${BACKEND_API_URL}/Playlists?pageNumber=1&pageSize=${newPageSize}`)
            .then((response) => response.json())
            .then((data) => {
                setPlaylists(data.data);
                setTotalPages(data.totalPages);
                setTotalRecords(data.totalRecords);
                setLoading(false);
            });
    };

    const updateUrlParams = (pageNumber: number, pageSize: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set('pageNumber', pageNumber.toString());
        url.searchParams.set('pageSize', pageSize.toString());
        window.history.replaceState({}, '', url);
    };
    return (
        <Container sx={{ padding: '2em' }}>
            <h1>Playlists</h1>

            {loading && <CircularProgress />}
            {!loading && playlists.length === 0 && <p>No playlists found</p>}
            {!loading && (
                <Container>
                    <Link to="/playlists/add">
                        <AddIcon />
                        Add New Playlist
                    </Link>
                </Container>
            )}
            {!loading && playlists.length > 0 && (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Tracks Count</TableCell>
                                    <TableCell align="center">Added By</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {playlists.map((playlist, index) => (
                                    <TableRow key={playlist.id}>
                                        <TableCell component="th" scope="row">
                                            {playlist.id}
                                        </TableCell>
                                        <TableCell align="center">{playlist.name}</TableCell>
                                        <TableCell align="center">{playlist.tracksCount}</TableCell>
                                        <TableCell align="center">
                                            <Link to={`/user/${playlist.addedBy.replace('.', ',')}`}>{playlist.addedBy}</Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                component={Link}
                                                sx={{ mr: 3 }}
                                                to={`/playlists/${playlist.id}/details`}
                                            >
                                                <Tooltip title="View playlist details" arrow>
                                                    <ReadMoreIcon color="primary" />
                                                </Tooltip>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={totalRecords}
                        rowsPerPage={pageSize}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangePageSize}
                    />
                </>
            )}
        </Container>
    );
};