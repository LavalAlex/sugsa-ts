import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../../Components/Auth/Login/LoginCard";

import styles from "./Login.module.css";

export default function Login() {
  const auth = useSelector((state) => state.auth.user?.token);
  const navitage = useNavigate();
  
  useEffect(()=>{
    if(auth)
    navitage("/home")
  },[])

  return auth ? (
    navitage("/home")
  ) : (
    
      <div className={styles.container}>

      
        <LoginCard />
     
      </div>
    
  );
}
