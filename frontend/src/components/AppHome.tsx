import { Container, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

export const AppHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    // Clear the token from storage and perform any additional logout actions
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
  };

  useEffect(() => {
    getUserData();
  }, []); // Run only once on component mount

  const getUserData = () => {
    // Retrieve and decode the token from storage
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token and extract user information
      const decodedToken = decodeToken(token);
      setUserData(decodedToken);
      setIsLoggedIn(true);
    }
  };

  // Function to decode the JWT token
  const decodeToken = (token) => {
    try {
      const tokenParts = token.split(".");
      const encodedPayload = tokenParts[1];
      const decodedPayload = JSON.parse(atob(encodedPayload));
      console.log(decodedPayload);
      return decodedPayload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        {!isLoggedIn && (
          <div>
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
