import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Logo from "../../media/logo.png"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
  };

  return (
    <section className="h-100 d-flex align-items-center" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-xl-5 mx-auto">
            <div className="card rounded-3">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img src={Logo} style={{ width: "185px" }} alt="logo" />
                  <p className="mt-1 mb-5 pb-1">SQUIDIO</p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button color="primary">Log in</Button>
                    <a href="#!" className="text-muted">Forgot password?</a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
