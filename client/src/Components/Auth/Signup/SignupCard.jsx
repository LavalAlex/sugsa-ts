import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaKey, FaEye } from "react-icons/fa";

import { signup } from "../../../Redux/Actions/Auth";
import { validateSignup } from "../../../Utils/validate";

import style from "./SignupCard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  allBusiness,
  departamentBusiness,
} from "../../../Redux/Actions/Business";
import { optionSelect, selectDepartament } from "../../../Utils/optionBusiness";
import { allDepartament } from "../../../Redux/Actions/Departament";

export default function LoginCard({ setSelectLink }) {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const navitage = useNavigate();
  const [keyOn, setKeyOn] = useState(false);
  const [optionBusiness, setOptionBusines] = useState([]);
  const business = useSelector((state) => state.business.business);
  const departament = useSelector((state) => state.departament.departament);
  const [optionDepartament, setoptionDepartament] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    business: "",
    departament: "",
    code: "",
  });

  const [input, setInput] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    business: "",
    departament: "",
  });

  useEffect(() => {
    dispatch(allDepartament())
    dispatch(allBusiness());
  }, [input.name]);

  useEffect(() => {
    if (business[0]) {
      setOptionBusines(optionSelect(business));
    } else {
      dispatch(allBusiness());
      setOptionBusines([]);
    }
    if (departament[0]) {
      setoptionDepartament(selectDepartament(departament));
    } else {
      dispatch(allDepartament());
    }
  }, [input.name]);

  // useEffect(() => {
  //   if (departament[0]) {
  //     setoptionDepartament(selectDepartament(departament));
  //   } else {
  //     if (input.business) {
  //       dispatch(departamentBusiness(input.business));
  //       setoptionDepartament([]);
  //     }
  //   }
  // }, [input.business, departament[0]]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, business, departament, last_name } =
      validateSignup(input);
    if (email || password || business || departament || name || last_name) {
      setErrors((old) => ({
        ...old,
        name: name ? name : "",
        last_name: last_name ? last_name : "",
        email: email ? email : "",
        password: password ? password : "",
        business: business ? business : "",
        departament: departament ? departament : "",
      }));
    } else {
      var conf = window.confirm("Esta seguro que quiere crear el usuario?");
      if(conf){
        const code = await dispatch(signup(input));
        if (!code) {
        alert('Usuario creado con ??xito!')
        setSelectLink({login:"login"})
        } else {
          setErrors((old) => ({
            ...old,
            code: code.error,
          }));
        }
      }else{
        alert("Usuario NO CREADO!")
        setSelectLink({login:"login"})
      }
    }
      // const code = await dispatch(signup(input));
      // if (!code) {
      //   isAuth();
      // } else {
      //   setErrors((old) => ({
      //     ...old,
      //     code: code.error,
      //   }));
      // }
    
  };

  const handleSelectBusiness = async (e) => {
    setInput((old) => ({ ...old, business: e.map((option) => option.value)}));
    // await dispatch(departamentBusiness(e.value));
    setErrors({
      name: "",
      last_name: "",
      email: "",
      password: "",
      business: "",
      departament: "",
    });
  };

  const handleSelectDepartament = async (e) => {
    setInput((old) => ({ ...old, departament: e.map((option) => option.value.name) }));
    setErrors({
      name: "",
      last_name: "",
      email: "",
      password: "",
      business: "",
      departament: "",
    });
  };

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>- Registrarse -</h1>
        <label>
          <h5>Nombre:</h5>
          <div
            className={`${style.inputGroup} ${errors.name ? style.error : ""} `}
          >
            <FaUserCircle />
            <input
             pattern="[a-zA-Z]+"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Nombre..."
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
          <h5>Apellido:</h5>
          <div
            className={`${style.inputGroup} ${
              errors.last_name ? style.error : ""
            } `}
          >
            <FaUserCircle />
            <input
            pattern="[a-zA-Z]+"
              type="text"
              value={input.last_name}
              name="last_name"
              onChange={(e) => handleChange(e)}
              placeholder="Apellido..."
              autoComplete="off"
            />
          </div>
        </label>
        <div>
          {errors.last_name ? (
            <span className={style.errorSpan}>{errors.last_name}</span>
          ) : (
            ""
          )}
        </div>

        <label>
          <h5>Email:</h5>
          <div
            className={`${style.inputGroup} ${
              errors.email ? style.error : ""
            } `}
          >
            <FaUserCircle />
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="Email..."
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
          <h5>Contrase??a:</h5>
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
              placeholder="Contrase??a..."
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

        <label>
          <h5>Empresa:</h5>
          <label className={style.wrapper}>
            <Select
              className={`${style.wrapper} ${
                errors.business ? style.errorSelect : ""
              }`}
              onChange={(e) => handleSelectBusiness(e)}
              options={optionBusiness}
              placeholder="Empresa..."
              isMulti
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
          <h5>Departamento:</h5>
          <label className={style.wrapper}>
            <Select
              className={`${style.wrapper} ${
                errors.departament ? style.errorSelect : ""
              }`}
              onChange={(e) => handleSelectDepartament(e)}
              options={optionDepartament}
              placeholder="Departament..."
              isMulti
            />
          </label>
        </label>
        <div>
          {errors.departament ? (
            <span className={style.errorSpan}>{errors.departament}</span>
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
