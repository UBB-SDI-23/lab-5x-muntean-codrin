import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AlbumIcon from '@mui/icons-material/Album';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="absolute" >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ mr: 5 }}>
                        Music app
                    </Typography>
                    <Button
                        variant={path.startsWith("/artists") ? "outlined" : "text"}
                        to="/artists"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<PersonIcon />}>
                        Artists
                    </Button>
                    <Button
                        variant={path.startsWith("/albums") ? "outlined" : "text"}
                        to="/albums"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<AlbumIcon  />}>
                        Albums
                    </Button>
                    <Button
                        variant={path.startsWith("/tracks") ? "outlined" : "text"}
                        to="/tracks"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<MusicNoteIcon  />}>
                        Tracks
                    </Button>
                    <Button
                        variant={path.startsWith("/playlists") ? "outlined" : "text"}
                        to="/playlists"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<ListIcon  />}>
                        Playlists
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
