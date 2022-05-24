import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../../Components/Login/LoginCard";

import styles from "./Login.module.css";

export default function Login() {
  const user = useSelector((state) => state.auth);
  const navitage = useNavigate();
  

  return user.email ? (
    navitage("/home")
  ) : (
    
      <div className={styles.container}>

      <div className={styles.loginCard}>
        <LoginCard />
      </div>
      </div>
    
  );
}
