import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  NavbarBrand,
  Image,
  Container,
} from "react-bootstrap";
import Logo from "../../media/logo.png";
import Login from "../Login/Login";
// import isLoggedIn from "../../auth/isLoggedIn";

function NavbarComponent() {
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
                <Login/>
                <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
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
