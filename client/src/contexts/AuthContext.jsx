import { useState } from "react";
import { createContext } from "react";
import Axios from "../Axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await Axios.post("/admin/login", {
      email,
      password,
    });
    const data = res.data?.admin;
    console.log(res.data);
    localStorage.setItem(
      "crud-operation-access-token",
      `Bearer ${res.data.accessToken}`
    );
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ login, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
