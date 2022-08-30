import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const Dashboard = () => {
  const addUser = () => {};

  const updateUser = () => {};

  const getUser = () => {};

  const deleteUser = () => {};
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between">
        <h2>Dashboard</h2>
        <Button variant="success" size="sm">
          Add New
        </Button>
      </div>
      <Table striped bordered hover className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Button variant="primary" size="sm">
                Edit
              </Button>{" "}
              <Button variant="danger" size="sm">
                Delete
              </Button>{" "}
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter44122121</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
