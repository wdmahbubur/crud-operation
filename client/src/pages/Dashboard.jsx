import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}users/`).then((res) => {
      setUsers(res.data.users);
    });
  };

  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  const addUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const phone = e.target.phone.value;

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}users/add`, {
        name,
        email,
        username,
        phone,
      })
      .then((res) => {
        handleCloseAddUser();
        setUsers([...users, res.data.user]);
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const updateUser = () => {};

  const deleteUser = () => {};
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between">
        <h2>Dashboard</h2>
        <Button variant="success" size="sm" onClick={handleOpenAddUser}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.phone}</td>
              <td>
                <Button variant="primary" size="sm">
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm">
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={openAddUser} onHide={handleCloseAddUser}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <form onSubmit={addUser}>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
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
            <Button variant="danger" onClick={handleCloseAddUser}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
};

export default Dashboard;
