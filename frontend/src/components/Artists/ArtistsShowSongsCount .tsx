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
  TablePagination
} from '@mui/material';

import { BACKEND_API_URL } from '../../constants';
import { Link } from 'react-router-dom';

import SongsCount from '../../models/SongsCount';

export const ArtistsShowSongsCount = () => {
  const [loading, setLoading] = useState(false);
  const [songsCounts, setSongsCounts] = useState<SongsCount[]>([]);
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
      fetch(`${BACKEND_API_URL}/Artists/Songs?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => response.json())
        .then((data) => {
            
          setSongsCounts(data.data);
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
    fetch(`${BACKEND_API_URL}/Artists/Songs?pageNumber=${newPage + 1}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setSongsCounts(data.data);
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
    fetch(`${BACKEND_API_URL}/Artists/Songs?pageNumber=1&pageSize=${newPageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setSongsCounts(data.data);
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
      <h1>Artists Songs Count</h1>

      {loading && <CircularProgress />}
      {!loading && songsCounts.length === 0 && <p>No songs count found</p>}
      {!loading && songsCounts.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Artist Name</TableCell>
                  <TableCell align="center">Songs Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songsCounts.map((songsCount, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{songsCount.artistName}</TableCell>
                    <TableCell align="center">{songsCount.songsCount}</TableCell>
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
