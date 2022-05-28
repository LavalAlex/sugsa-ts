import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../../Components/Login/LoginCard";

import styles from "./Login.module.css";

export default function Login() {
  const auth = useSelector((state) => state.auth.success);
  const navitage = useNavigate();
  
  return auth ? (
    navitage("/home")
  ) : (
    
      <div className={styles.container}>

      
        <LoginCard />
     
      </div>
    
  );
}
