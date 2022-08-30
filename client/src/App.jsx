import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import refresh from "react-refresh";
console.log(refresh.performReactRefresh());

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
