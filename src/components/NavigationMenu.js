import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../assets/logo.png'; // Add your logo image in the assets folder
import '../styles/NavigationMenu.css';

const NavigationMenu = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Navbar.Brand href="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      BmB
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isAuthenticated && (
            <>
              <NavDropdown title="Reports" id="basic-nav-dropdown">
                <NavDropdown.Item href="/filter-missing-person-reports">Missing Persons</NavDropdown.Item>
                <NavDropdown.Item href="/filter-found-person-reports">Found Persons</NavDropdown.Item>
                <NavDropdown.Item href="/filter-missing-item-reports">Missing Items</NavDropdown.Item>
                <NavDropdown.Item href="/filter-found-item-reports">Found Items</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/report/new">Create Report</NavDropdown.Item>
              </NavDropdown>
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
