import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const UpdateUser = ({
  openUpdateUser,
  handleCloseUpdateUser,
  updateUser,
  updateUserId,
}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (updateUserId)
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}users/${updateUserId}`)
        .then((res) => {
          setUser(res.data.user);
        });
  }, [updateUserId]);

  return (
    <Modal show={openUpdateUser} onHide={handleCloseUpdateUser}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <form onSubmit={updateUser}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              value={user?.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseUpdateUser}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateUser;
