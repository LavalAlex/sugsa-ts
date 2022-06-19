import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginCardAdmin from "../../../Components/Admin/Auth/Login/LoginCardAdmin";

import NewPasswordCard from "../../../Components/Admin/Auth/NewPassword/NewPasswordCard";
import styles from "./LoginAdmin.module.css";

import NavBarAuth from "../../../Components/NavBarAuth/NavBarAuth";

export default function AdminLogin() {
  const admin = useSelector((state) => state.authAdmin.user?.token);
  const navitage = useNavigate();
  const session = useSelector((state) => state.authAdmin);

  // let navitage = useNavigate();
  const [selectLink, setSelectLink] = useState({login:"login"});

  const [newPass, setNewPass] = useState(true);

  useEffect(() => {
    if (admin) navitage("/admin/home");
  }, []);


  const handleAuth = ()=>{
    navitage("/admin/home")
  }

  return (
    <div className={styles.container}>
      <NavBarAuth handleLink={setSelectLink} active={selectLink} />
      {selectLink.login ? <LoginCardAdmin handleAuth={handleAuth} /> : ""}
      {selectLink.newPassword ? (
        <NewPasswordCard handleLink={setSelectLink} />
      ) : (
        ""
      )}
    </div>
  );
  // admin ? (
  //   // console.log('auth',admin)
  //   navitage("/admin/home")
  // ) : (
  //   <div className={styles.container}>
  //     {newPass? <NewPasswordCard email={session.email} setNewPass={setNewPass}/> : <LoginCardAdmin />}
  //   </div>
  // );
}
