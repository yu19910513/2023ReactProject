import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  NavbarBrand,
  Image,
  Container,
} from "react-bootstrap";
import Logo from "../../media/logo.png";
import Login from "../Logging/Login";
import Logout from "../Logging/Logout";
import authService from "../../services/AuthService";
import Profile from "../../pages/Profile/Profile";

function NavbarComponent() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setLogin(authService.loggedIn());
  }, []);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavbarBrand href="/" className="d-flex justify-content-center">
            <Image
              src={Logo}
              width="40"
              height="40"
              className="d-inline-block align-center mr-2"
              alt="Logo"
            />
            {" SQUIDIO"}
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Account" id="account-nav-dropdown">
                {login ? <Profile /> : null}
                {login ? (
                  <NavDropdown.Item href="/history">
                    Order History
                  </NavDropdown.Item>
                ) : null}
                {login ? <Logout /> : <Login />}
                {login ? null : (
                  <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
                )}
              </NavDropdown>
              <NavDropdown title="Collection" id="collection-nav-dropdown">
                <NavDropdown.Item href="/product/soap">Soaps</NavDropdown.Item>
                <NavDropdown.Item href="/product/candle">
                  Candle
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/product">
                  All Products
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
