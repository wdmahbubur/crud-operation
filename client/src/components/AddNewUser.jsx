import React from "react";
import { Button, Modal } from "react-bootstrap";

const AddNewUser = ({ openAddUser, handleCloseAddUser, addUser }) => {
  return (
    <Modal show={openAddUser} onHide={handleCloseAddUser}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <form onSubmit={addUser}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAddUser} type="reset">
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

export default AddNewUser;
