import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  NavbarBrand,
  Image,
  Container,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import Logo from "../../media/logo.png";

function NavbarComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email} Password: ${password}`);
  };
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
                <NavDropdown.Item href="#" onClick={handleShow}>
                  Log in
                </NavDropdown.Item>
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

      <Offcanvas show={showModal} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Login</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit} id="loginForm">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                // id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                // id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
          </Form>
          <Container className="mt-2 md-auto">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="loginForm"
              value="Submit"
            >
              Login
            </Button>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarComponent;
