import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiHomeAlt, BiUserPin } from "react-icons/bi";
import { FaToolbox } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import { AiOutlineFolderAdd } from "react-icons/ai";


import styles from "./Menu.module.css";
import { useSelector } from "react-redux";

export default function Menu({ column, home, tool, notification, maintenance }) {
  const path = useLocation().pathname;
  const admin = useSelector((state)=> state.admin)

  return (
    <ul className={`${styles.menu} ${column ? styles.column : ""}`}>
      {home ? (
        <li>
          <NavLink
            title="Home"
            className={`${styles.menu__link} ${
              path === "/home" || path=== "/admin/home"? styles.active : ""
            }`}
            to={path === "/home"? '/home': '/admin/home'}
          >
            <BiHomeAlt className={styles.icon} />
          </NavLink>
        </li>
      ) : (
        <></>
      )}
       {notification ? (
        <li>
          <NavLink
            title="Notification"
            className={`${styles.menu__link} ${
              path === "/notification" ? styles.active : ""
            }`}
            to="/notification"
          >
            <BiUserPin className={styles.icon} />
          </NavLink>
        </li>
      ) : (
        <></>
      )}

{tool ? (
        <li>
          <NavLink
            title="Administración"
            className={`${styles.menu__link} ${
              path === "/admin/tool" ? styles.active : ""
            }`}
            to="/admin/tool"
          >
            <AiOutlineFolderAdd className={styles.icon} />
          </NavLink>
        </li>
      ) : (
        <></>
      )}

{maintenance? (   <li>
          <NavLink
            title="Mantenimiento"
            className={`${styles.menu__link} ${
              path === "/admin/maintenance" ? styles.active : ""
            }`}
            to="/admin/maintenance"
          >
            <GrHostMaintenance className={styles.icon} />
          </NavLink>
        </li>):(<></>)}
    </ul>
  );
}
