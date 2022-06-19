import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaKey, FaEye } from "react-icons/fa";

import { login } from "../../../../Redux/Actions/Auth";
import { validateLogin } from "../../../../Utils/validate";
// import { statusMsg } from "../../Utils/status";

import style from "./NewPasswordCard.module.css";

// import logo from "../../Img/logo.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import AdminLogin from "../../../Pages/Admin/Auth/AdminLogin";
import { newPasswordAdmin } from "../../../../Redux/Actions/Admin";
import { BsFillChatSquareDotsFill } from "react-icons/bs";

export default function NewPasswordCard({ handleLink }) {
  const dispatch = useDispatch();
  const [keyOn, setKeyOn] = useState(false);
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    code: "",
    codeRes:"",
  });
  const [input, setInput] = useState({
    email: "",
    code: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = validateLogin(input);
    if (email || password) {
      setErrors((old) => ({
        ...old,
        email: email ? email : "",
        password: password ? password : "",
      }));
      email
        ? setInput({ email: "", password: "" })
        : setInput((old) => ({
            ...old,
            password: "",
          }));
    } else {
      const codeRes = await dispatch(newPasswordAdmin(input));
      if (!codeRes) {
        alert("Cuenta habilitada!")
        handleLink({login:"login"});
      } else {
        setErrors((old) => ({
          ...old,
          codeRes: codeRes.error,
        }));
      }
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>- NUEVA CONTRASEÑA -</h1>
        <label>
          <h3>Email</h3>
          <div
            className={`${style.inputGroup} ${
              errors.email ? style.error : ""
            } `}
          >
            <FaUserCircle />
            <input
              type="text"
              value={input.email}
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="Ingrese email..."
              autoComplete="off"
            />
          </div>
        </label>
        <div>
          {errors.email ? (
            <span className={style.errorSpan}>{errors.email}</span>
          ) : (
            ""
          )}
        </div>
        <label>
          <h3>Código</h3>
          <div
            className={`${style.inputGroup} ${errors.code ? style.error : ""} `}
          >
            <BsFillChatSquareDotsFill/>
            <input
              type="text"
              value={input.code}
              name="code"
              onChange={(e) => handleChange(e)}
              placeholder="Ingrese código..."
              autoComplete="off"
            />
          </div>
        </label>
        <div>
          {errors.code ? (
            <span className={style.errorSpan}>{errors.code}</span>
          ) : (
            ""
          )}
        </div>
        <label>
          <h3>Password</h3>
          <div
            className={`${style.inputGroupPass} ${
              errors.password ? style.error : ""
            } `}
          >
            <FaKey />
            <input
              type={keyOn ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="Ingrese contraseña..."
            />
            <FaEye
              className={style.keyEye}
              onClick={(e) => {
                setKeyOn((old) => !old);
              }}
            />
          </div>
        </label>
        <div>
          {errors.password ? (
            <span className={style.errorSpan}>{errors.password}</span>
          ) : (
            ""
          )}
        </div>
        <div>
          {errors.codeRes ? (
            <span className={style.errorSpan}>{errors.codeRes}</span>
          ) : (
            ""
          )}
        </div>
        <div className={style.buttonContainer}>
          <button type="submit">Enviar Contraseña</button>
        </div>
        {/* {path === "/login" ? (
          <div className={style.buttonContainer}>
            <div>OR</div>
            <button type="submit" onClick={() => navigate("/signup")}>
              SignUp
            </button>
          </div>
        ) : (
          ""
        )} */}

        {/* {path === "/login" ? (
          <div className={style.path}>
            <button onClick={() => navigate("/admin/login")}>Admin</button>
          </div>
        ) : (
          <div className={style.path}>
            <button onClick={() => navigate("/login")}>User</button>
          </div>
        )} */}

        {/* <div className={style.left}>
          <Link className={style.brand} to={`${path === "/login" ? "/admin/login" : "/login"}`}>
            
            <img src={logo} className={style.logo} alt="" />
          </Link>
        </div> */}
      </form>
    </div>
  );
}
