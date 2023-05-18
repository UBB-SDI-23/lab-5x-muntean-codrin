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
import Track from '../../models/Track';

export const TracksShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [userPageSize, setUserPageSize] = useState<number | null>(null);
  
    useEffect(() => {
      setLoading(true);
      getUserPageSize();
    }, []);
  
    const getUserPageSize = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/UserProfile/pagesize/sarah43_c118d0%40example.com`);
        const pageSizeValue = await response.text();
        setPageSize(parseInt(pageSizeValue));
        setUserPageSize(parseInt(pageSizeValue));
        const url = new URL(window.location.href);
        const pageNumber = parseInt(url.searchParams.get('pageNumber') || '1');
        setPage(pageNumber);
  
        try {
          const tracksResponse = await fetch(`${BACKEND_API_URL}/Tracks?pageNumber=${pageNumber}&pageSize=${pageSize}`);
          const tracksData = await tracksResponse.json();
          setTracks(tracksData.data);
          setTotalPages(tracksData.totalPages);
          setTotalRecords(tracksData.totalRecords);
          setLoading(false);
        } catch (error) {
          console.log(error);
          // Handle fetch error for tracks data
        }
      } catch (error) {
        console.log(error);
        // Handle error fetching user page size
      }
    };
  
    const fetchData = (pageNumber: number, pageSize: number) => {
      fetch(`${BACKEND_API_URL}/Tracks?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => response.json())
        .then((data) => {
          setTracks(data.data);
          setTotalPages(data.totalPages);
          setTotalRecords(data.totalRecords);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // Handle fetch error for tracks data
        });
    };
  
    const handleChangePage = (event, newPage: number) => {
      setPage(newPage);
      updateUrlParams(newPage, pageSize);
      fetchData(newPage, pageSize);
    };
  
    const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newPageSize = parseInt(event.target.value);
      setPageSize(newPageSize);
      setPage(1);
      updateUrlParams(1, newPageSize);
      fetchData(1, newPageSize);
    };
  
    const updateUrlParams = (pageNumber: number, pageSize: number) => {
      const url = new URL(window.location.href);
      url.searchParams.set('pageNumber', pageNumber.toString());
      url.searchParams.set('pageSize', pageSize.toString());
      window.history.replaceState({}, '', url);
    };
  
    useEffect(() => {
      if (userPageSize !== null && userPageSize !== pageSize) {
        setPageSize(userPageSize);
        setPage(1);
        updateUrlParams(1, userPageSize);
        fetchData(1, userPageSize);
      }
    }, [userPageSize]);

    return (
        <Container sx={{ padding: '2em' }}>
            <h1>Tracks</h1>

            {loading && <CircularProgress />}
            {!loading && tracks.length === 0 && <p>No tracks found</p>}
            {!loading && (
                <Container>
                    <Link to="/tracks/add">
                        <AddIcon />
                        Add New Track
                    </Link>
                </Container>
            )}
            {!loading && tracks.length > 0 && (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Album ID</TableCell>
                                    <TableCell align="center">Composer</TableCell>
                                    <TableCell align="center">Duration (Milliseconds)</TableCell>
                                    <TableCell align="center">Release Date</TableCell>
                                    <TableCell align="center">Appears in Playlists</TableCell>
                                    <TableCell align="center">Added By</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tracks.map((track, index) => (
                                    <TableRow key={track.id}>
                                        <TableCell component="th" scope="row">
                                            {track.id}
                                        </TableCell>
                                        <TableCell align="center">{track.name}</TableCell>
                                        <TableCell align="center">{track.albumId}</TableCell>
                                        <TableCell align="center">{track.composer}</TableCell>
                                        <TableCell align="center">{track.milliseconds}</TableCell>
                                        <TableCell align="center">{track.releaseDate}</TableCell>
                                        <TableCell align="center">{track.appearsInPlaylists}</TableCell>
                                        <TableCell align="center">
                                            <Link to={`/user/${track.addedBy.replace('.', ',')}`}>{track.addedBy}</Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                component={Link}
                                                sx={{ mr: 3 }}
                                                to={`/tracks/${track.id}/details`}
                                            >
                                                <Tooltip title="View track details" arrow>
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