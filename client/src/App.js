import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Sigup/Signup";

import LandingPage from "./Pages/Landing/LandingPage"
import Home from "./Pages/Home/Home";
import Notification from "./Pages/Notification/Notification";
import Tool from "./Pages/Tools/Tools";

import AdminLogin from "./Pages/Admin/Auth/AdminLogin";
import AdminHome from "./Pages/Admin/Home/AdminHome";

import Navbar from "./Components/Navbar/NavBar";
import PrivateRoute from "./Components/TypeRoutes/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="notification" element={<Notification />} />
          <Route path="tool" element={<Tool />} />
          <Route path="admin">
            <Route path="home" element={<AdminHome />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
