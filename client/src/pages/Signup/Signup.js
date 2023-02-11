import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import authService from "../../services/AuthService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    adminSecret: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const isFormValid = (data) => {
    if (
      data.name.length > 0 &&
      data.email.length > 0 &&
      data.password.length > 0 &&
      data.password === data.confirmedPassword
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authService
      .signUp(formData)
      .then((res) => {
        authService.signIn(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
    console.log(formData);
  };

  return (
    <Container className="mt-5">
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            name="confirmedPassword"
            value={formData.confirmedPassword}
            onChange={handleChange}
            disabled={formData.password.length < 1}
          />
        </Form.Group>
        <Form.Group controlId="formAdminSecret">
          <Form.Label>Admin Privilage (not common)</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter admin code"
            name="adminSecret"
            value={formData.adminSecret}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!isFormValid(formData)}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
