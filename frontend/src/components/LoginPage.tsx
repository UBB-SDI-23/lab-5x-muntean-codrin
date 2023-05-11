import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSetToken = (token) => {
    localStorage.setItem("token", token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields
    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = "Email is required.";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_API_URL}/Authenticate/login`, formData);
      if (response.status === 200) {
        const { token } = response.data;
        handleSetToken(token);
        // You can perform additional actions based on the successful login, such as navigating to another page
        navigate("/");
      } else {
        console.log("test");
      }
    } catch (error) {
      
        const errorData = error.response.data;
        const errors = Array.isArray(errorData) ? errorData : [errorData];
        setErrors({ general: errors });

    }
  };

  return (
    <Container>
      <h1>Login</h1>
      {errors.general && (
        <div>
          {errors.general.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <br />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
          required
        />
        <br />
        <Button type="submit">Login</Button>
      </form>
      <Link to="/register">Don't have an account? Register</Link>
    </Container>
  );
};

export default LoginPage;
