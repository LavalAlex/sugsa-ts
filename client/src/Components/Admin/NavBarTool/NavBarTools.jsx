import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./NavBarTools.module.css";
import {
  IoBusiness,
  IoFileTrayStackedOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdAddBusiness, MdAdminPanelSettings } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";

export default function NavBarTools({ handleLink, active }) {
  let navitage = useNavigate();
  return (
    <nav className={style.nav}>
      <div
        className={`${style.navItems} ${
          active.businessAdd ? style.active : ""
        }`}
      >
        <MdAddBusiness
          onClick={() => handleLink({ businessAdd: "businessAdd" })}
          className={style.icon}
          title="Agregar Empresas"
        />
      </div>

      <div
        className={`${style.navItems} ${
          active.businessEdit ? style.active : ""
        }`}
      >
        <IoBusiness
          onClick={() => handleLink({ businessEdit: "businessEdit" })}
          className={style.icon}
          title="Editar Empresa"
        />
      </div>
      <div
        className={`${style.navItems} ${
          active.departament ? style.active : ""
        }`}
      >
        <IoFileTrayStackedOutline
          onClick={() => handleLink({ departament: "departament" })}
          className={style.icon}
          title="Agregar Departamento"
        />
      </div>
      <div
        className={`${style.navItems} ${active.technical ? style.active : ""}`}
      >
        <BsTools
          onClick={() => handleLink({ technical: "technical" })}
          className={style.icon}
          title="Agregar Técnico"
        />
      </div>
      <div className={`${style.navItems} ${active.user ? style.active : ""}`}>
        <FaUserPlus
          onClick={() => handleLink({ user: "user" })}
          className={style.icon}
          title="Agregar Usuario"
        />
      </div>
      <div
        className={`${style.navItems} ${active.userEdit ? style.active : ""}`}
      >
        <FaUserEdit
          onClick={() => handleLink({ userEdit: "userEdit" })}
          className={style.icon}
          title="Editar Usuario"
        />
      </div>
      <div className={`${style.navItems} ${active.ticket ? style.active : ""}`}>
        <IoTicketOutline
          onClick={() => handleLink({ ticket: "ticket" })}
          className={style.icon}
          title="Ticket"
        />
      </div>
    </nav>
  );
}
