import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCardAdmin from "../../../Components/Admin/Auth/Login/LoginCardAdmin";

import styles from "./LoginAdmin.module.css";

export default function AdminLogin() {
  const admin = useSelector((state) => state.authAdmin.user?.token);
  const navitage = useNavigate();

  useEffect(()=>{
    if(admin)
    navitage("/admin/home")
  },[])

  return admin ? (
    // console.log('auth',admin)
    navitage("/admin/home")
  ) : (
    <div className={styles.container}>
      
        <LoginCardAdmin />
      
    </div>
  );
}
