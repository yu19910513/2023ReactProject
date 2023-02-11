import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import userService from "../../services/UserService";
import authService from "../../services/AuthService";

const UserProfile = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (authService.isOwner(id)) {
      userService
        .getOwner(id)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error(error);
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
            <h4>Admin Privilage: {authService.isAdmin()?("Yes"):("No")}</h4>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
