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
import Artist from '../../models/Artist';

export const ArtistsShowAll = () => {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    setLoading(true);
    getUserPageSize();
  }, []);

  const getUserPageSize = async () => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/UserProfile/pagesize/sarah43_c118d0%40example.com`);
      const pageSizeValue = await response.text();
      const userPageSize = parseInt(pageSizeValue);
      setPageSize(userPageSize);
      setPage(1);
      fetchData(1, userPageSize);
    } catch (error) {
      console.log(error);
      // Handle error fetching user page size
    }
  };

  const fetchData = (pageNumber: number, pageSize: number) => {
    fetch(`${BACKEND_API_URL}/Artists?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setArtists(data.data);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Handle fetch error for artists data
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

    return (
        <Container sx={{ padding: '2em' }}>
            <h1>Artists</h1>

            {loading && <CircularProgress />}
            {!loading && artists.length === 0 && <p>No artists found</p>}
            {!loading && (
                <Container>
                    <Link to="/artists/add">
                        <AddIcon />
                        Add New Artist
                    </Link>
                </Container>
            )}
            {!loading && artists.length > 0 && (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Desc</TableCell>
                                    <TableCell align="center">Website link</TableCell>
                                    <TableCell align="center">Debut Year</TableCell>
                                    <TableCell align="center">Profile Picture Url</TableCell>
                                    <TableCell align="center">Albums count</TableCell>
                                    <TableCell align="center">Added by</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {artists.map((artist, index) => (
                                    <TableRow key={artist.id}>
                                        <TableCell component="th" scope="row">
                                            {artist.id}
                                        </TableCell>
                                        <TableCell align="center">{artist.name}</TableCell>
                                        <TableCell align="center">{artist.description}</TableCell>
                                        <TableCell align="center">{artist.websiteLink}</TableCell>
                                        <TableCell align="center">{artist.debutYear}</TableCell>
                                        <TableCell align="center">{artist.profilePictureUrl}</TableCell>
                                        <TableCell align="center">{artist.albumsCount}</TableCell>
                                        <TableCell align="center">
                                            <Link to={`/user/${artist.addedBy.replace('.', ',')}`}>{artist.addedBy}</Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                component={Link}
                                                sx={{ mr: 3 }}
                                                to={`/artists/${artist.id}/details`}
                                            >
                                                <Tooltip title="View artist details" arrow>
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
