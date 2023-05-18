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
  Pagination,
} from '@mui/material';
import { BACKEND_API_URL } from '../../constants';
import PlaylistLength from '../../models/PlaylistLength';

export const PlaylistsShowLength = () => {
  const [loading, setLoading] = useState(false);
  const [playlistLengths, setPlaylistLengths] = useState<PlaylistLength[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const url = new URL(window.location.href);
    const pageNumber = parseInt(url.searchParams.get('pageNumber') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    setLoading(true);

    fetch(`${BACKEND_API_URL}/playlists/length?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setPlaylistLengths(data.data);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
        setLoading(false);
        setPage(pageNumber);
        setPageSize(pageSize);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
    updateUrlParams(newPage, pageSize);
    fetch(`${BACKEND_API_URL}/playlists/length?pageNumber=${newPage}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setPlaylistLengths(data.data);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value);
    setPageSize(newPageSize);
    setPage(1);
    updateUrlParams(1, newPageSize);
    fetch(`${BACKEND_API_URL}/playlists/length?pageNumber=1&pageSize=${newPageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setPlaylistLengths(data.data);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
      })
      .catch((error) => {
        console.log(error);
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
      <h1>Playlist Lengths</h1>

      {loading && <CircularProgress />}
      {!loading && playlistLengths.length === 0 && <p>No playlist lengths found</p>}
      {!loading && playlistLengths.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Playlist Name</TableCell>
                  <TableCell align="center">Playlist Length</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playlistLengths.map((playlistLength, index) => (
                  <TableRow key={playlistLength.playlistId}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{playlistLength.playlistName}</TableCell>
                    <TableCell align="center">{playlistLength.length}</TableCell>
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

export default PlaylistsShowLength;
