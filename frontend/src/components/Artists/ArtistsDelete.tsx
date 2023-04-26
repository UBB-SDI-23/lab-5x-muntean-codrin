import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const ArtistsDelete = () => {
    const { artistId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await axios.delete(`${BACKEND_API_URL}/artists/${artistId}`);
        navigate("/artists");
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/artists");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artists`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    Are you sure you want to delete this Artist?
                </CardContent>
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};