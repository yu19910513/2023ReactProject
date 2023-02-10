import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import userService from "../../services/UserService";
import authService from "../../services/AuthService";

const UserProfile = (props) => {
  const { id } = useParams();
  const [authorized, authenticate] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Check if the user is logged in by checking local storage for a token
    const token = localStorage.getItem("token");
    if (token && !authService.isTokenExpired(token)) {
      userService
        .getOwner(id)
        .then((res) => {
          authenticate(true);
          setUser(res.data);
        })
        .catch((error) => {
          console.error(error);
          authenticate(false);
        });
    } else {
        window.location.replace("/")
    }
  }, [id]);
  return (
    <>
      <NavbarComponent />
      <Container>
        <Row className="align-items-center">
          <Col xs={3}>
            <Image src="https://via.placeholder.com/150" roundedCircle />
          </Col>
          <Col xs={9}>
            <h3>{user.name}</h3>
            <Badge variant="secondary">Software Engineer</Badge>
            {authorized? (<p>Password: {user.password}</p>):(null)}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
