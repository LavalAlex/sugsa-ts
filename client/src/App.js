import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Notification from "./Pages/Notification/Notification";

import Navbar from "./Components/Navbar/NavBar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="notification" element={<Notification />} />
      </Routes>
    </div>
  );
}

export default App;
