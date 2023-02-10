import React from "react";
import { NavDropdown } from "react-bootstrap";
import authService from "../../services/AuthService";

const Profile = () => {
  const url = "/profile/" + authService.getId();
  return (
    <NavDropdown.Item href={url} id={authService.getId()}>
      {authService.getName()}'s Profile
    </NavDropdown.Item>
  );
};

export default Profile;
