import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./NavBarAuth.module.css";
import { IoBusiness, IoFileTrayStackedOutline, IoKey } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdAdminPanelSettings, MdOutlineHowToReg } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";

export default function NavBarTools({ handleLink, active, signup }) {
  let navitage = useNavigate();
  return (
    <nav className={style.nav}>
      <div className={`${style.navItems} ${active.login ? style.active : ""}`}>
        <FiLogIn
          onClick={() => handleLink({ login: "login" })}
          className={style.icon}
          title="Login"
        />
      </div>
      <div
        className={`${style.navItems} ${active.newPassword ? style.active : ""}`}
      >
        <MdOutlineHowToReg
          onClick={() => handleLink({ newPassword: "newPassword" })}
          className={style.icon}
          title="Habilitar Cuenta / Contraseña"
        />
      </div>
      {signup ? (
        <div
          className={`${style.navItems} ${active.signup ? style.active : ""}`}
        >
          <AiOutlineUserAdd
            onClick={() => handleLink({ signup: "signup" })}
            className={style.icon}
            title="Registrarse"
          />
        </div>
      ) : (
        ""
      )}
      {/* <div className={`${style.navItems} ${active.user? style.active:""}`}>
        <AiOutlineUserAdd
          onClick={() => handleLink({user:"user"})}
          className={style.icon}
          title="Agregar Usuario"
        />
      </div>
      <div className={`${style.navItems} ${active.admin? style.active:""}`}>
        <MdAdminPanelSettings
          onClick={() => handleLink({admin:"admin"})}
          className={style.icon}
          title="Agregar Admin"
        />
      </div> */}
    </nav>
  );
}
