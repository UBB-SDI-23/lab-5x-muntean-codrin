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
    IconButton,
    Tooltip,
    Pagination,
    Select,
    MenuItem,
} from '@mui/material';

import ReadMoreIcon from "@mui/icons-material/ReadMore";
import AddIcon from "@mui/icons-material/Add";

import { Link } from 'react-router-dom';

import { BACKEND_API_URL } from '../../constants';
import { UserProfile } from '../../models/User';
import { checkLoggedIn, getEmail, getRole } from '../authService';
import { AxiosHeaders } from 'axios';


export const UsersShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        const url = new URL(window.location.href);
        const pageNumber = parseInt(url.searchParams.get('pageNumber') || '1');
        const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
        setLoading(true);
        setIsLoggedIn(checkLoggedIn());
        setEmail(getEmail());
        setRole(getRole());
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            fetch(`${BACKEND_API_URL}/UserProfile?pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers: headers })
                .then((response) => response.json())
                .then((data) => {
                    setUsers(data.data);
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

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
        updateUrlParams(newPage, pageSize);
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        fetch(`${BACKEND_API_URL}/UserProfile?pageNumber=${newPage}&pageSize=${pageSize}`, { headers: headers })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
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
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        fetch(`${BACKEND_API_URL}/UserProfile?pageNumber=1&pageSize=${newPageSize}`, { headers: headers })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
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

    const handleRoleChange = (event: React.ChangeEvent<{ value: string }>, user: UserProfile) => {
        const newRole = event.target.value;
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        fetch(`${BACKEND_API_URL}/UserProfile/role?user=${user.email}&role=${newRole}`, { method: 'POST', headers: headers })
            .then((response) => {
                if (response.ok) {
                    const updatedUsers = users.map((u) => {
                        if (u.email === user.email) {
                            return { ...u, role: newRole };
                        }
                        return u;
                    });
                    setUsers(updatedUsers);
                } else {
                    console.log(response);
                }
            });
    };


    return (
        <Container sx={{ padding: '2em' }}>
            {isLoggedIn && role === 'Admin' && (
                <>

                    <h1>Users</h1>

                    {loading && <CircularProgress />}
                    {!loading && users.length === 0 && <p>No users found</p>}
                    {!loading && users.length > 0 && (
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">First Name</TableCell>
                                            <TableCell align="center">Last Name</TableCell>
                                            <TableCell align="center">Email</TableCell>
                                            <TableCell align="center">City</TableCell>
                                            <TableCell align="center">Gender</TableCell>
                                            <TableCell align="center">Date of Birth</TableCell>
                                            <TableCell align="center">Role</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user, index) => (
                                            <TableRow key={index + 1}>
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="center">{user.firstName}</TableCell>
                                                <TableCell align="center">{user.lastName}</TableCell>
                                                <TableCell align="center">{user.email}</TableCell>
                                                <TableCell align="center">{user.city}</TableCell>
                                                <TableCell align="center">{user.gender}</TableCell>
                                                <TableCell align="center">{user.dateOfBirth}</TableCell>
                                                <TableCell align="center">
                                                    <Select
                                                        value={user.role || "User"}
                                                        onChange={(event) => handleRoleChange(event, user)}
                                                    >
                                                        <MenuItem value="User">User</MenuItem>
                                                        <MenuItem value="Moderator">Moderator</MenuItem>
                                                        <MenuItem value="Admin">Admin</MenuItem>
                                                    </Select>
                                                </TableCell>
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
                </>
            )}
            {!isLoggedIn && <p>You are not logged in</p>}
            {isLoggedIn && role !== 'Admin' && <p>You are not authorized to view this page</p>}
        </Container>
    );
};
