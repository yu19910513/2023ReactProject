import React, { useState } from "react";
import {
  Form,
  Button,
  Offcanvas,
  Container,
  NavDropdown,
} from "react-bootstrap";
import AuthService from "../../services/AuthService";


const Login = () => {
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
    AuthService.logIn({ email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        handleClose();
        window.location.reload(false);
        // window.location.replace("/signup");
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <>
      <NavDropdown.Item href="#" onClick={handleShow}>
        Login
      </NavDropdown.Item>

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
};

export default Login;
