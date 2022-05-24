import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupCard from "../../../Components/Signup/SignupCard";

import styles from "./Signup.module.css";

export default function Login() {
  const user = useSelector((state) => state.auth);
  const navitage = useNavigate();
  
  return user.state === 200 ? (
    navitage("/login")
  ) : (
    
      <div className={styles.container}>

      <div className={styles.signCard}>
        <SignupCard />
      </div>
      </div>
    
  );
}