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

  const getUserPageSize = async () => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/UserProfile/pagesize/sarah43_c118d0%40example.com`);
      const pageSizeValue = await response.text();
      setPageSize(parseInt(pageSizeValue));
    } catch (error) {
      console.log(error);
      // Handle error fetching user page size
    }
  };

  useEffect(() => {
    setLoading(true);
  
    const getUserPageSize = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/UserProfile/pagesize/sarah43_c118d0%40example.com`);
        const pageSizeValue = await response.text();
        setPageSize(parseInt(pageSizeValue));
  
        const url = new URL(window.location.href);
        let pageNumber = parseInt(url.searchParams.get('pageNumber') || '1');
        let pageSize = parseInt(url.searchParams.get('pageSize') || pageSizeValue);
  
        // Check if the pageNumber is less than 1, set it to 1
        pageNumber = Math.max(pageNumber, 1);
  
        setPage(pageNumber);
  
        try {
          const albumsResponse = await fetch(`${BACKEND_API_URL}/Albums?pageNumber=${pageNumber}&pageSize=${pageSize}`);
          const albumsData = await albumsResponse.json();
          setAlbums(albumsData.data);
          setTotalPages(albumsData.totalPages);
          setTotalRecords(albumsData.totalRecords);
          setLoading(false);
        } catch (error) {
          console.log(error);
          // Handle fetch error for albums data
        }
  
      } catch (error) {
        console.log(error);
        // Handle error fetching user page size
      }
    };
  
    getUserPageSize();
  }, []);

  const handleChangePage = async (event, newPage: number) => {
    setPage(newPage);
    updateUrlParams(newPage, pageSize);
  
    try {
      const response = await fetch(`${BACKEND_API_URL}/Albums?pageNumber=${newPage}&pageSize=${pageSize}`);
      const data = await response.json();
      setAlbums(data.data);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // Handle fetch error for albums data
    }
  };
  
  const handleChangePageSize = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value);
    setPageSize(newPageSize);
    setPage(1);
    updateUrlParams(1, newPageSize);
  
    try {
      const response = await fetch(`${BACKEND_API_URL}/Albums?pageNumber=1&pageSize=${newPageSize}`);
      const data = await response.json();
      setAlbums(data.data);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // Handle fetch error for albums data
    }
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