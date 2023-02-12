import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import NavbarComponent from "../../components/NavBar/NavbarComponent";
import userService from "../../services/UserService";
import authService from "../../services/AuthService";

const UserProfile = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (authService.isOwner(id)) {
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

  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    email: user.email,
    admin: user.admin,
    address: address.address,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
    phone: address.phone,
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    console.log(updatedUser);
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
              <Form>
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
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={updatedUser.address}
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
              </Form>
            ) : (
              <>
                <p onClick={handleEdit}>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Admin Privilege: {user.admin ? "Yes" : "No"}</p>
                <p>Address: {address.address}</p>
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
