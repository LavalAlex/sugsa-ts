import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Notification from "./Pages/Notification/Notification";

import AdminLogin from "./Pages/Admin/Auth/AdminLogin";
import AdminHome from "./Pages/Admin/Home/AdminHome";

import Navbar from "./Components/Navbar/NavBar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="notification" element={<Notification />} />
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="adminhome" element={<AdminHome />} />
      </Routes>
    </div>
  );
}

export default App;
