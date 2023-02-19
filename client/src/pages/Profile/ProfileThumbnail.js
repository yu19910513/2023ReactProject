import React, { useState } from "react";
import userService from "../../services/UserService";
import { Col, Form, Image, Modal, Button } from "react-bootstrap";
import Logo from "../../media/logo.png";

const ProfileThumbnail = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    userService.updateProfilePicture(formData)
    handleCloseModal();
  };

  return (
    <Col xs={12} md={3}>
      {user.thumbnail == null ? (
        <Image src={Logo} onClick={handleShowModal} thumbnail />
      ) : (
        <Image src={user.thumbnail} onClick={handleShowModal} thumbnail />
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control type="file" id="thumbnail" label="Upload a new picture" onChange={handleFileChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ProfileThumbnail;
