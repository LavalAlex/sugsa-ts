import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaKey, FaEye } from "react-icons/fa";

// import { signup } from "../../../Redux/Actions/Auth";
// import { validateSignup } from "../../../Utils/validate";

import style from "./Technicals.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  allBusiness,
  departamentBusiness,
} from "../../../../Redux/Actions/Business";
// import {
//   allBusiness,
//   departamentBusiness,
// } from "../../../Redux/Actions/Business";
import {
  optionSelect,
  selectDepartament,
} from "../../../../Utils/optionBusiness";
import { validateSignup, validateTechnical } from "../../../../Utils/validate";
import { createTechnical } from "../../../../Redux/Actions/Admin";

export default function Technicals({ isAuth }) {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const navitage = useNavigate();
  const [keyOn, setKeyOn] = useState(false);
  const [optionBusiness, setOptionBusines] = useState([]);
  const business = useSelector((state) => state.business.business);
  const departament = useSelector((state) => state.business.departament);
  const [optionDepartament, setoptionDepartament] = useState([]);

  const[submit, setSubmit] = useState(0)
  const [errors, setErrors] = useState({
    name: "",
    last_name: "",
    email: "",
    business: "",
    code: "",
  });

  const [input, setInput] = useState({
    name: "",
    last_name: "",
    email: "",
    business: "",
  });

  useEffect(() => {
    dispatch(allBusiness());
  }, [input.name]);

  useEffect(() => {
    if (business[0]) {
      setOptionBusines(optionSelect(business));
    } else {
      dispatch(allBusiness());
      setOptionBusines([]);
    }
  }, [input.name]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors("");
  };

  const handleSubmit = async (e) => {
    setSubmit((old) => old+1)
    if(submit<1){

      e.preventDefault();
      const { name, email, business, last_name } = validateTechnical(input);
      if (email || business || name || last_name) {
        setErrors((old) => ({
          ...old,
          name: name ? name : "",
          last_name: last_name ? last_name : "",
          email: email ? email : "",
          business: business ? business : "",
        }));
      } else {
        var conf = window.confirm("Esta seguro que quiere crear el Técnico?");
        if (conf) {
          const code = await dispatch(createTechnical(input));
          if (!code) {
            alert("Técnico creado con éxitos!");
            setInput({ name: "", last_name: "", email: "", business: "" });
          } else {
            setErrors((old) => ({
              ...old,
              code: code.error,
            }));
          }
        } else {
        alert("Técnico NO FUE creado!");
        setInput({ name: "", last_name: "", email: "", business: "" });
      }
    }
  }else{
    alert("Datos enviados, aguarde un segundo!")
  }
  };

  const handleSelectBusiness = async (e) => {
    setInput((old) => ({ ...old, business: e.value.name }));
    await dispatch(departamentBusiness(e.value));
    setErrors({
      name: "",
      last_name: "",
      email: "",
      business: "",
    });
  };

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>- TÉCNICO -</h1>
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
          <h5>Empresa:</h5>
          <label className={style.wrapper}>
            <Select
              className={`${style.wrapper} ${
                errors.business ? style.errorSelect : ""
              }`}
              onChange={(e) => handleSelectBusiness(e)}
              options={optionBusiness}
              placeholder="Empresa..."
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
        <div>
          {errors.code ? (
            <span className={style.errorSpan}>{errors.code}</span>
          ) : (
            ""
          )}
        </div>
        <div className={style.buttonContainer}>
          <button type="submit">Crear Técnico</button>
        </div>
      </form>
    </div>
  );
}
