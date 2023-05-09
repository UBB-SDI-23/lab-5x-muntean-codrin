import { useState, useEffect } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Container } from "@mui/material";
import { BACKEND_API_URL } from "../../constants";
import PlaylistLength from "../../models/PlaylistLength";

export const PlaylistsShowLength = () => {
  const [loading, setLoading] = useState(false);
  const [playlistLengths, setPlaylistLengths] = useState<PlaylistLength[]>([]);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`${BACKEND_API_URL}/playlists/length`)
        .then((response) => response.json())
        .then((data) => {
          setPlaylistLengths(data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container sx={{ padding: '2em' }}>
      <h1>Playlist Lengths</h1>

      {loading && <CircularProgress />}
      {!loading && playlistLengths.length === 0 && <p>No playlist lengths found</p>}
      {!loading && playlistLengths.length > 0 && (
        <TableContainer>
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
                  <TableCell align="center">{playlistLength.playlistLength}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
