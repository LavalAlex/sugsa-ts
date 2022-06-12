import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";

import Menu from "./Menu/Menu";
import logo from "../../Img/logo.jpeg";
import { logout } from "../../Redux/Actions/Auth";
import { adminLogout } from "../../Redux/Actions/Admin";

import styles from "./NavBar.module.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((store) => store.auth.user?.token);
  const [showMenu, setShowMenu] = useState(false);
  const admin = useSelector((state) => state.authAdmin.user?.token);
  const path = useLocation().pathname;

  const logoutNav = () => {
    if (admin) {
      dispatch(adminLogout());
      navigate("/admin/login");
    }
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          {session ? (
            <Link className={styles.brand} to={path}>
              <span>SUGSA</span>
              <img src={logo} className={styles.logo} alt="" />
            </Link>
          ) : (
            <Link
              className={styles.brand}
              to={`${path === "/login" ? "/admin/login" : "/login"}`}
            >
              <span>SUGSA</span>
              <img src={logo} className={styles.logo} alt="" />
            </Link>
          )}
        </div>

        {path === "/admin/home" ? (
          <ul className={styles.menu}>
            <Menu home maintenance/>
          </ul>
        ) : (
          <ul className={styles.menu}>
            <Menu home  maintenance/>
          </ul>
        )}

        <div className={styles.right}>
          {session ? (
            <div>
            {/* <div className={styles.profile__container}>
              <div
                className={
                  `${showMenu ? styles.show : styles.hide} ` +
                  styles.profile__menu
                }
              >
                <Menu column home tool notification />:
              </div>
            </div> */}
             <div className={styles.right}>
             <button
               title="Log Out"
               className={`${styles.nav__link} ${styles.logout}`}
               onClick={() => logoutNav()}
             >
               <FiLogOut />
             </button>
           </div>
           </div>
          ) : admin ? (
            <div className={styles.right}>
              <button
                title="Log Out"
                className={`${styles.nav__link} ${styles.logout}`}
                onClick={() => logoutNav()}
              >
                <FiLogOut />
              </button>
            </div>
          ) : (
            <NavLink to="/login">
              <button
                title="Log In"
                className={`${styles.nav__link} ${styles.sigup}`}
                onClick={() => logoutNav()}
              >
                <FiLogIn />
              </button>
            </NavLink>
          )}
        </div>
      </nav>
      <Outlet />
    </header>
  );
}
