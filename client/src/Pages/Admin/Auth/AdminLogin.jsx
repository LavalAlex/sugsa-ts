import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCardAdmin from "../../../Components/Admin/Auth/Login/LoginCardAdmin";

import styles from "./LoginAdmin.module.css";

export default function AdminLogin() {
  const admin = useSelector((state) => state.auth);
  const navitage = useNavigate();

  return admin.success ? (
    navitage("/admin/home")
  ) : (
    <div className={styles.container}>
      
        <LoginCardAdmin />
      
    </div>
  );
}
