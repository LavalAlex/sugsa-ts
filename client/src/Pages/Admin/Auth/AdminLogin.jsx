import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../../Components/Login/LoginCard";

import styles from "./LoginAdmin.module.css";

export default function AdminLogin() {
  const admin = useSelector((state) => state.auth);
  const navitage = useNavigate();
  
  return admin.email ? (
    navitage("/admin/home")
  ) : (
    
      <div className={styles.container}>

      <div className={styles.loginCard}>
        <LoginCard />
      </div>
      </div>
    
  );
}