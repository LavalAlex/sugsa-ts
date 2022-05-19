import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiHomeAlt, BiUserPin } from "react-icons/bi";
import { FaToolbox } from "react-icons/fa";

import styles from "./Menu.module.css";

export default function Menu({ column, home, tool, notification }) {
  const path = useLocation().pathname;

  return (
    <ul className={`${styles.menu} ${column ? styles.column : ""}`}>
      {home ? (
        <li>
          <NavLink
            title="Home"
            className={`${styles.menu__link} ${
              path === "/home" ? styles.active : ""
            }`}
            to="/home"
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
            title="Maintenance"
            className={`${styles.menu__link} ${
              path === "/tool" ? styles.active : ""
            }`}
            to="/tool"
          >
            <FaToolbox className={styles.icon} />
          </NavLink>
        </li>
      ) : (
        <></>
      )}

    </ul>
  );
}
