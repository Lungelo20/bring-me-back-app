// src/components/NavigationMenu.js
import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/NavigationMenu.css';

const NavigationMenu = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">BringMeBack</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {isAuthenticated && (
                        <>
                            <Nav.Link href="/reports">Reports</Nav.Link>
                            <Nav.Link href="/report/new">Create Report</Nav.Link>
                            {user && user.role === 'General' && (
                                <Nav.Link href="/users">User Management</Nav.Link>
                            )}
                        </>
                    )}
                </Nav>
                <Nav>
                    {!isAuthenticated ? (
                        <>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationMenu;
