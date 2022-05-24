import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaKey, FaEye } from "react-icons/fa";

import { login, signup } from "../../Redux/Actions/Auth";
import { validateLogin } from "../../Utils/validate";
import { statusMsg } from "../../Utils/status";

import style from "./SignupCard.module.css";
import { useLocation } from "react-router-dom";
import { allBusiness, departamentBusiness } from "../../Redux/Actions/Business";
import { optionSelect, selectDepartament } from "../../Utils/optionBusiness";

export default function LoginCard() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const [keyOn, setKeyOn] = useState(false);
  const [optionBusiness, setOptionBusines] = useState([]);
  const business = useSelector((state) => state.business.business);
  const departament = useSelector((state) => state.business.departament);
  const [optionDepartament, setoptionDepartament] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    business: "",
    departament:""
  });
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    business: "",
    departament:""
  });

  useEffect(() => {
    dispatch(allBusiness());
  }, []);

  useEffect(() => {
    if (business[0]) {
      setOptionBusines(optionSelect(business));
    } else {
      setOptionBusines([]);
    }
  }, []);

  useEffect(() => {
    if (departament[0]) {
      setoptionDepartament(selectDepartament(departament));
    } else {
      setoptionDepartament([]);
    }
  },[]);

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
      const code = await dispatch(signup(input));
      console.log("code", code);
      // setErrors((old) => ({
      //   ...old,
      //   code: code.error ? code.error : "",
      // }));
    }
  };

  const handleSelectBusiness = async (e) => {
    setInput((old) => ({ ...old, business: e.value }));
    await dispatch(departamentBusiness(e.value));
    setErrors({
      name: "",
      email: "",
      password: "",
      business: "",
      departament:""
    });
  };

  const handleSelectDepartament = async (e) => {
    setInput((old) => ({ ...old, business: e.value }));
    setErrors({
      name: "",
      email: "",
      password: "",
      business: "",
      departament:""
    });
  };

  console.log(departament);
  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>{path === "/signup" ? "- SIGN UP -" : "- LOGIN ADMIN -"}</h1>
        <label>
          <h5>Name</h5>
          <div
            className={`${style.inputGroup} ${errors.name ? style.error : ""} `}
          >
            <FaUserCircle />
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Enter name"
              autoComplete="off"
            />
          </div>
        </label>
        <div>
          {errors.name ? (
            <span className={style.errorSpan}>{errors.name}</span>
          ) : (
            ""
          )}
        </div>
        <label>
          <h5>Business</h5>
          <label className={style.wrapper}>
            <Select
              onChange={(e) => handleSelectBusiness(e)}
              options={optionBusiness}
              placeholder="Business..."
            />
          </label>
        </label>
        <div>
          {errors.business ? (
            <span className={style.errorSpan}>{errors.business}</span>
          ) : (
            ""
          )}
        </div>
        
        <label>
          <h5>Departament</h5>
          <label className={style.wrapper}>
            <Select
              onChange={(e) => handleSelectDepartament(e)}
              options={optionDepartament}
              placeholder="Departament..."
            />
          </label>
        </label>
        <div>
          {errors.business ? (
            <span className={style.errorSpan}>{errors.business}</span>
          ) : (
            ""
          )}
        </div>

        <label>
          <h5>Email</h5>
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
              placeholder="Enter email"
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
          <h5>Password</h5>
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
              placeholder="Enter password"
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
          {errors.code ? (
            <span className={style.errorSpan}>{errors.code}</span>
          ) : (
            ""
          )}
        </div>
        <div className={style.buttonContainer}>
          <button type="submit">SigUp</button>
        </div>
      </form>
    </div>
  );
}
