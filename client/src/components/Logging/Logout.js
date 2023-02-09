import React from "react";
import { NavDropdown } from "react-bootstrap";
import authService from "../../services/AuthService";

const Logout = () => {
  const onChange = () => {
    authService.logout();
    window.location.reload();
  };
  return (
    <NavDropdown.Item href="#" onClick={onChange}>
      Log out
    </NavDropdown.Item>
  );
};

export default Logout;
