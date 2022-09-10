import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import Axios from "../Axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      if (!user?._id) {
        Axios.get("/admin/logged-admin").then((res) => {
          setUser(res.data?.admin);
          localStorage.setItem(
            "crud-operation-access-token",
            `Bearer ${res.data.accessToken}`
          );
        });
      }
    } catch (err) {
      setUser({});
    }
  }, []);

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

  const logout = async () => {
    await Axios.get("/admin/logout").then((res) => {
      console.log(res.data.message);
    });
    localStorage.removeItem("crud-operation-access-token");
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
