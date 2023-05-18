import { Container, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { checkLoggedIn, getRole, getUserData } from "./authService.ts";

export const AppHome = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserData(null);
    };

    useEffect(() => {
        setIsLoggedIn(checkLoggedIn());
        setUserData(getUserData());
        setRole(getRole());
        console.log(getRole());
    }, []);

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                {!isLoggedIn && (
                    <div>

                        <Typography variant="h3" component="h3" gutterBottom>
                            Welcome to the app! Use the menu above to navigate.
                        </Typography>
                        <Button component={Link} to="/login" variant="contained">
                            Login
                        </Button>
                        <Button component={Link} to="/register" variant="contained">
                            Register
                        </Button>
                    </div>
                )}
                {isLoggedIn && (
                    <div>
                        <Typography variant="h4" component="h4" gutterBottom>
                            Welcome, {userData.FirstName} {userData.LastName}!
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Email: {userData.Email}
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Role: {role}
                        </Typography>
                        <Button variant="contained" onClick={handleLogout}>
                            Logout
                        </Button>
                        {/* Display additional user information from the decoded token */}

                    </div>
                )}
            </Container>
        </React.Fragment>
    );
};
