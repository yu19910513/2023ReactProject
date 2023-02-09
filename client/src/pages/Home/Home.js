import React, { useEffect, useState } from "react";
import TestService from "../../services/TestService";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import { Card, Container } from "react-bootstrap";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [state, setState] = useState("");

  useEffect(() => {
    setState("loading");
    TestService.getAll()
      .then((res) => {
        setState("success");
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setState("error");
        setError(err);
      });
  }, []);

  if (state === "error") return <h1>{error.toString()}</h1>;

  return (
    <>
      <NavbarComponent />
      <Container>
        <div className="d-flex flex-wrap">
          {state === "loading" ? (
            <h1>Loading...</h1>
          ) : (
            users.map((user, index) => {
              return (
                <Card key={index} style={{ width: "18rem", margin: "20px" }}>
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle>ID: {user.id}</Card.Subtitle>
                  </Card.Body>
                </Card>
              );
            })
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
