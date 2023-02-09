import React from 'react';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';
import NavbarComponent from '../../components/Navbar/NavbarComponent';

const UserProfile = () => {

  return (
    <>
    <NavbarComponent />
    <Container>
      <Row className="align-items-center">
        <Col xs={3}>
          <Image src="https://via.placeholder.com/150" roundedCircle />
        </Col>
        <Col xs={9}>
          <h3> Rex Yu</h3>
          <Badge variant="secondary">Software Engineer</Badge>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default UserProfile;
