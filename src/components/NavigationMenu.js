import React, { useContext } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { FaHome, FaBell, FaEnvelope, FaBullhorn, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../styles/NavigationMenu.css';

const NavigationMenu = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="navbar">
      <Navbar.Brand href="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="badge badge-info-logo">Bring Me Back</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav className="center-section">
          {isAuthenticated && (
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <FaUserCircle className="profile-icon" />
                <span className="username">{user ? user.name : 'Hello and welcome again!'}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                <Dropdown.Item href="/" onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
        <Nav className="ml-auto icon-menu">
          <Nav.Link href="/" title="Home"><FaHome className="nav-icon" /></Nav.Link>
          <Nav.Link href="/announcements" title="Announcements/Events"><FaBullhorn className="nav-icon" /></Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link href="/notifications" title="Notifications"><FaBell className="nav-icon" /></Nav.Link>
              <Nav.Link href="/messages" title="Messages"><FaEnvelope className="nav-icon" /></Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationMenu;
