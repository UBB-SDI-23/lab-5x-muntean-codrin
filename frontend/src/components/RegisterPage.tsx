import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState<RegisterModel>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        city: "",
        gender: "",
        dateOfBirth: new Date(),
    });
    const [errors, setErrors] = useState<Partial<RegisterModel>>({});
    const [confirmationCode, setConfirmationCode] = useState<string>("");
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors: Partial<RegisterModel> = {};

        // Validate fields
        if (!formData.email) {
            validationErrors.email = "Email is required.";
        }
        if (!formData.password) {
            validationErrors.password = "Password is required.";
        }
        else if (!/\d/.test(formData.password)) {
            validationErrors.password = "Password must contain at least one digit.";
        }
        else if (!/[a-z]/.test(formData.password)) {
            validationErrors.password = "Password must contain at least one lowercase letter.";
        }
        else if (!/[A-Z]/.test(formData.password)) {
            validationErrors.password = "Password must contain at least one uppercase letter.";
        }
        else if (!/\W/.test(formData.password)) {
            validationErrors.password = "Password must contain at least one non-alphanumeric character.";
        }

        if (formData.firstName.length < 3) {
            validationErrors.firstName = "First Name should have at least 3 characters.";
        }
        if (formData.lastName.length < 3) {
            validationErrors.lastName = "Last Name should have at least 3 characters.";
        }
        if (!formData.city) {
            validationErrors.city = "City is required.";
        }
        if (formData.gender !== "male" && formData.gender !== "female") {
            validationErrors.gender = "Gender must be 'male' or 'female'.";
        }
        if (!formData.dateOfBirth) {
            validationErrors.dateOfBirth = "Date of Birth is required.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_API_URL}/authenticate/register`, formData);
            if (response.status === 200) {
                setConfirmationCode(response.data);
            }
            else {
                console.log("test");
            }
            // Handle success or navigate to another page
        } catch (error) {

            const errorData = error.response.data;

            const errors = Array.isArray(errorData) ? errorData : [errorData];
            console.log(errors);
            setErrors({ general: errors });
        }
    };

    return (
        <Container>
            <h1>Register</h1>
            {errors.general && !confirmationCode && (
                <div>
                    {errors.general.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            {confirmationCode ? (
                <div>
                    <p>Confirmation Code: {confirmationCode}</p>
                    <a href={`${BACKEND_API_URL}/Authenticate/register/confirm/${confirmationCode}`}>
                        Click here to confirm your registration
                    </a>
                </div>

            ) : (

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
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        required
                    />
                    <br />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        required
                    />
                    <br />
                    <TextField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={!!errors.city}
                        helperText={errors.city}
                        required
                    />
                    <br />
                    <TextField
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        error={!!errors.gender}
                        helperText={errors.gender}
                        required
                    />
                    <br />
                    <TextField
                        type="date"
                        label="Date of Birth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth.toISOString().split("T")[0]}
                        onChange={handleInputChange}
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth}
                        required
                    />
                    <br />
                    <Button type="submit">Register</Button>
                </form>
            )}
            <Link to="/login">Already have an account? Login</Link>
        </Container>
    );
};

export default RegisterPage;
