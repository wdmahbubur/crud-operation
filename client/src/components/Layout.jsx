import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Crud Operation</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user?._id ? (
                <Nav.Link
                  href="#logout"
                  className="text-danger btn-danger"
                  onClick={logout}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link href="#home">Home</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
