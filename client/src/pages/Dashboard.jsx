import Axios from "../Axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import AddNewUser from "../components/AddNewUser";
import UpdateUser from "../components/UpdateUser";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserId, setUpdateUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get(`/users/`).then((res) => {
      setUsers(res.data.users);
    });
  };

  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  const handleOpenUpdateUser = (id) => {
    setUpdateUserId(id);
    setOpenUpdateUser(true);
  };
  const handleCloseUpdateUser = () => setOpenUpdateUser(false);

  const addUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const phone = e.target.phone.value;

    Axios.post(`/users/add`, {
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

  const updateUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const phone = e.target.phone.value;

    Axios.put(`/users/update/${updateUserId}`, {
      name,
      email,
      username,
      phone,
    })
      .then((res) => {
        handleCloseUpdateUser();
        setUsers(
          users.map((user) =>
            user._id === updateUserId ? res.data.user : user
          )
        );
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const deleteUser = (id) => {
    Axios.delete(`/users/delete/${id}`)
      .then((res) => {
        setUsers(users.filter((user) => user._id !== id));
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
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
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenUpdateUser(user._id)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddNewUser
        openAddUser={openAddUser}
        handleCloseAddUser={handleCloseAddUser}
        addUser={addUser}
      />
      <UpdateUser
        openUpdateUser={openUpdateUser}
        handleCloseUpdateUser={handleCloseUpdateUser}
        updateUser={updateUser}
        updateUserId={updateUserId}
      />
    </Container>
  );
};

export default Dashboard;
