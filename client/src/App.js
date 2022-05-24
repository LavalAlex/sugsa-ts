import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Sigup/Signup";

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
        <Route path="signup" element={<Signup />} />

        <Route path="notification" element={<Notification />} />
        <Route path="admin" >
          <Route path="login" element={<AdminLogin />} />
          <Route path="home" element={<AdminHome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
