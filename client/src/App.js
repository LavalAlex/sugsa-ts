import React from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";

import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Sigup/Signup";

import LandingPage from "./Pages/Landing/LandingPage";
import Home from "./Pages/Home/Home";
import Notification from "./Pages/Notification/Notification";
import Tool from "./Pages/Tools/Tools";

import AdminLogin from "./Pages/Admin/Auth/AdminLogin";
import AdminHome from "./Pages/Admin/Home/AdminHome";
import AdminFollowing from "./Pages/Admin/Following/AdminFollowing";

import Navbar from "./Components/Navbar/NavBar";
import PrivateRoute from "./Components/TypeRoutes/PrivateRoute";
import PrivateRouteAdmin from "./Components/TypeRoutes/PriviteRouteAdmin";

import Feedback from "./Pages/Feedback/Feedback";

function App() {
  // const path = useLocation().pathname;
  // console.log(path.match("/feedback")[0])
  return (
    <div>
      {/* {path.match("/feedback")[0]==="/feedback"? "": */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="feedback/:id" element={<Feedback />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="notification" element={<Notification />} />
          <Route path="tool" element={<Tool />} />
        </Route>
        <Route element={<PrivateRouteAdmin />}>
          <Route path="admin">
            <Route path="home" element={<AdminHome />} />
            <Route path="following:id" element={<AdminFollowing />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
