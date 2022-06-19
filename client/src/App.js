import React from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";

import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Sigup/Signup";

import LandingPage from "./Pages/Landing/LandingPage";
import Home from "./Pages/Home/Home";
import Notification from "./Pages/Notification/Notification";
import Tool from "./Pages/Admin/Tools/Tools";

import AdminLogin from "./Pages/Admin/Auth/AdminLogin";
import AdminHome from "./Pages/Admin/Home/AdminHome";
import AdminFollowing from "./Pages/Admin/Following/AdminFollowing";
import Maintenance from "./Pages/Admin/Maintenance/Maintenance";

import Navbar from "./Components/Navbar/NavBar";
import PrivateRoute from "./Components/TypeRoutes/PrivateRoute";
import PrivateRouteAdmin from "./Components/TypeRoutes/PriviteRouteAdmin";

import Feedback from "./Pages/Feedback/Feedback";
import Departament from "./Pages/Admin/Tools/Departament/Departament";

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
        </Route>
        <Route element={<PrivateRouteAdmin />}>
          <Route path="admin">
            <Route path="home" element={<AdminHome />} />
            <Route path="following:id" element={<AdminFollowing />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="tool" element={<Tool />}/>
            <Route path="tool/departament" element={<Departament />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
