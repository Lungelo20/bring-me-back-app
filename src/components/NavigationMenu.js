// NavigationMenu.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../styles/NavigationMenu.css';

const NavigationMenu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">BringMeBack</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/reports">Reports</Nav.Link>          
           <Nav.Link href="/report/new">Create Report</Nav.Link>
           <Nav.Link href="/users">User Manangement</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link> {/* Add Link for Login */}
          <Nav.Link href="/register">Register</Nav.Link> {/* Add Link for Register */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  );
}

export default NavigationMenu;
