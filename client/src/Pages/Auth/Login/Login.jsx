import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../../Components/Auth/Login/LoginCard";
import SignupCard from "../../../Components/Auth/Signup/SignupCard";
import styles from "./Login.module.css";

import NavBarAuth from "../../../Components/NavBarAuth/NavBarAuth";
import NewPasswordCard from "../../../Components/Auth/NewPassword/NewPasswordCard";

export default function Login() {
  const auth = useSelector((state) => state.auth.user?.token);
  const navitage = useNavigate();

  const [selectLink, setSelectLink] = useState({ login: "login" });

  const handleAuth = () => {
    navitage("/home");
  };

  useEffect(() => {
    if (auth) navitage("/home");
  }, []);

  

  return (
    <div className={styles.container}>
      <NavBarAuth handleLink={setSelectLink} active={selectLink} signup />
      {selectLink.login ? <LoginCard  handleAuth={handleAuth}/> : ""}
      {selectLink.newPassword ? (
        <NewPasswordCard handleLink={setSelectLink} />
      ) : (
        ""
      )}
      {selectLink.signup ? <SignupCard setSelectLink={setSelectLink} /> : ""}
    </div>
  );
}
