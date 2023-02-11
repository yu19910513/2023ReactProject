import React from "react";
import { NavDropdown } from "react-bootstrap";
import authService from "../../services/AuthService";

const Profile = () => {
  const url = "/profile/" + authService.getUserId();
  return (
    <NavDropdown.Item href={url} id={authService.getUserId()}>
      {authService.getName()}'s Profile
    </NavDropdown.Item>
  );
};

export default Profile;
