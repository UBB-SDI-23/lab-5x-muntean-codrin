import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Container } from "@mui/system";
import { Card, CardActions, CardContent, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Artist from "../../models/Artist";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Track from "../../models/Track";

export const TrackDetails = () => {
    const { trackId } = useParams();
    const [track, setTrack] = useState<Track>();
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const url = `${BACKEND_API_URL}/tracks/${trackId}`;
      const fetchTrack = async () => {
        setLoading(true);
        try {
          const response = await axios.get(url);
          const track = response.data;
          setTrack(track);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTrack();
    }, [trackId]);
  
    return (
      <Container>
        <Card>
          <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/tracks`}>
              <ArrowBackIcon />
            </IconButton>{" "}
            <h1>Track Details</h1>
            <p>Track Name: {track?.name}</p>
            <p>Album ID: {track?.albumId}</p>
            <p>Composer: {track?.composer}</p>
            <p>Milliseconds: {track?.milliseconds}</p>
            <p>Release Date: {track?.releaseDate.toString()}</p>
            <p>Added By: {track?.addedBy}</p>
            <p>
              Album:{" "}
              {track?.album && (
                <Link to={`/albums/${track.album.id}/details`}>
                  {track.album.title}
                </Link>
              )}
            </p>
          </CardContent>
          <CardActions>
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/tracks/${trackId}/edit`}
            >
              <EditIcon />
            </IconButton>
  
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/tracks/${trackId}/delete`}
            >
              <DeleteForeverIcon sx={{ color: "red" }} />
            </IconButton>
          </CardActions>
        </Card>
      </Container>
    );
  };
  
  export default TrackDetails;