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
    Pagination,
} from '@mui/material';

import ReadMoreIcon from "@mui/icons-material/ReadMore";
import AddIcon from "@mui/icons-material/Add";

import { Link } from 'react-router-dom';

import { BACKEND_API_URL } from '../../constants';
import Album from '../../models/Album';

export const AlbumsShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const url = new URL(window.location.href);
        const pageNumber = parseInt(url.searchParams.get('pageNumber') || '1');
        const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
        setLoading(true);
        try {
            fetch(`${BACKEND_API_URL}/Albums?pageNumber=${pageNumber}&pageSize=${pageSize}`)
                .then((response) => response.json())
                .then((data) => {
                    setAlbums(data.data);
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

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage + 1);
        updateUrlParams(newPage + 1, pageSize);
        fetch(`${BACKEND_API_URL}/Albums?pageNumber=${newPage + 1}&pageSize=${pageSize}`)
            .then((response) => response.json())
            .then((data) => {
                setAlbums(data.data);
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
        fetch(`${BACKEND_API_URL}/Albums?pageNumber=1&pageSize=${newPageSize}`)
            .then((response) => response.json())
            .then((data) => {
                setAlbums(data.data);
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
            <h1>Albums</h1>

            {loading && <CircularProgress />}
            {!loading && albums.length === 0 && <p>No albums found</p>}
            {!loading && (
                <Container>
                    <Link to="/albums/add">
                        <AddIcon />
                        Add New Album
                    </Link>
                </Container>
            )}
            {!loading && albums.length > 0 && (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">Title</TableCell>
                                    <TableCell align="center">Artist ID</TableCell>
                                    <TableCell align="center">Release Date</TableCell>
                                    <TableCell align="center">Cover Image URL</TableCell>
                                    <TableCell align="center">Tracks Count</TableCell>
                                    <TableCell align="center">Added By</TableCell>
                                    <TableCell align="center">Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {albums.map((album, index) => (
                                    <TableRow key={album.id}>
                                        <TableCell component="th" scope="row">
                                            {album.id}
                                        </TableCell>
                                        <TableCell align="center">{album.title}</TableCell>
                                        <TableCell align="center">{album.artistId}</TableCell>
                                        <TableCell align="center">{album.releaseDate}</TableCell>
                                        <TableCell align="center">{album.coverImageUrl}</TableCell>
                                        <TableCell align="center">{album.tracksCount}</TableCell>
                                        <TableCell align="center">
                                            <Link to={`/user/${album.addedBy.replace('.', ',')}`}>{album.addedBy}</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/albums/${album.id}/details`}>
                                            <Tooltip title="View album details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>
                                    </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination
                        count={Math.ceil(totalRecords / pageSize)}
                        page={page}
                        onChange={handleChangePage}
                        showFirstButton
                        showLastButton
                    />
                </>
            )}
        </Container>
    );
};