import React, { useContext } from "react";
import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?._id) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <Container className="mt-5">
      <div className="bg-light w-50 p-5 mx-auto">
        <h4 className="text-center">Login </h4>
        <form onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
          </div>
          <Button variant="success" type="submit">
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
