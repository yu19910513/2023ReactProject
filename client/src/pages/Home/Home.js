import React, { useEffect, useState } from "react";
import TestService from "../../services/TestService";
import { v4 as uuidv4 } from 'uuid';

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
    <div>
      <div>
        {state === "loading" ? (
          <h1>Loading...</h1>
        ) : (
          users.map((user, index) => {
            console.log(user);
            return(
              <div>
              <h3 key={index}>Name: {user.name}</h3>
              <p key={index+user.idx}>ID: {user.id}</p>
            </div>
            )
          })
        )}
      </div>
    </div>
  );
};
export default Home;
