import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import NavbarComponent from "../../components/NavBar/NavbarComponent";
import userService from "../../services/UserService";
import authService from "../../services/AuthService";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    if (authService.isOwner(id) || authService.isAdmin()) {
      userService
        .getOwner(id)
        .then((res) => {
          setUser(res.data);
          setAddress(res.data.address);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      window.location.replace("/");
    }
  }, [id]);

  const handleEdit = () => {
    if (authService.isOwner(id)) {
      setUpdatedUser({
        name: user.name,
        email: user.email,
        admin: user.admin,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        phone: address.phone,
      });
      setEditing(true);
    } else if (!authService.isAdmin()) {
      alert("Your sing-in token expired. Please log in again");
      window.location.assign("/");
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const isFormValid = (data) => {
    if (data.name.length > 0 && data.email.length > 0) {
      return true;
    }
    return false;
  };

  const handleSave = () => {
    setEditing(false);
    const user = {
      name: updatedUser.name,
      email: updatedUser.email,
      admin: updatedUser.admin,
    };
    const address = {
      street: updatedUser.street,
      city: updatedUser.city,
      state: updatedUser.state,
      zipCode: updatedUser.zipCode,
      phone: updatedUser.phone,
    };
    userService.updateUser(user, address);
    setUser(user);
    setAddress(address);
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  return (
    <>
      <NavbarComponent />
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <Image src={user.thumbnail} thumbnail />
          </Col>
          <Col xs={12} md={9}>
            <h1>{user.name}'s Profile</h1>
            {editing ? (
              <Form onSubmit={handleSave}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={updatedUser.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                {authService.isAdmin() ? (
                  <Form.Group controlId="formAdmin">
                    <Form.Label>Admin Privilege</Form.Label>
                    <Form.Control
                      as="select"
                      name="admin"
                      value={updatedUser.admin}
                      onChange={handleChange}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Form.Control>
                  </Form.Group>
                ) : null}

                <Form.Group controlId="formStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={updatedUser.street}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={updatedUser.city}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={updatedUser.state}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formZipCode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="number"
                    name="zipCode"
                    value={updatedUser.zipCode}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Contect Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    value={updatedUser.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isFormValid(updatedUser)}
                >
                  Submit
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <p onClick={handleEdit}>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Admin Privilege: {user.admin ? "Yes" : "No"}</p>
                <p>Street: {address.street}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Zip Code: {address.zipCode}</p>
                <p>Contact Number: {address.phone}</p>{" "}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
