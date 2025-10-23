import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">IPL Dashboard</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/yearly">Yearly Stats</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
