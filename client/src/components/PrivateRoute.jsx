import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  let location = useLocation();
  if (user?._id) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
