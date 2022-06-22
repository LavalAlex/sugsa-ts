import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaKey, FaEye } from "react-icons/fa";

// import { validateSignup } from "../../../Utils/validate";
import { validateInput } from "../../../../Utils/validate";
import style from "./Business.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { allDepartament } from "../../../../Redux/Actions/Departament";

import { selectDepartament } from "../../../../Utils/optionBusiness";
import { allBusiness, createBusiness } from "../../../../Redux/Actions/Business";
import { allTicektConfig } from "../../../../Redux/Actions/Ticket";

export default function BusinessAdd() {
  const dispatch = useDispatch();
  const navitage = useNavigate();
  const [keyOn, setKeyOn] = useState(false);

  const [optionDepartament, setoptionDepartament] = useState([]);

  const departament = useSelector((state) => state.departament.departament);

  const [errors, setErrors] = useState({
    name: "",
    departament: "",
    code: "",
  });

  const [input, setInput] = useState({
    name: "",
    departament: "",
  });

  useEffect(() => {
    dispatch(allDepartament());
    dispatch(allBusiness());
    dispatch(allTicektConfig())
  }, [input.name]);

  useEffect(() => {
    if (departament[0]) {
      setoptionDepartament(selectDepartament(departament));
    } else {
      dispatch(allDepartament());
    }
  }, [input.name, departament[0]]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, departament } = validateInput(input);
    if (departament || name) {
      setErrors((old) => ({
        ...old,
        name: name ? name : "",
        departament: departament ? departament : "",
      }));
    } else {
      var conf = window.confirm("Esta seguro que quiere crear la empresa?");
      if(conf){
        const code = await dispatch(createBusiness(input));
        if (!code) {
          alert("Empresa creada con éxitos!");
          setoptionDepartament([])
          setInput((old)=>({...old, departament: "" }));
          // navitage('/admin/tool')
        } else {
          setErrors((old) => ({
            ...old,
            code: code.error,
          }));
        }
      }else{
        alert("La empresa NO se creo!")
        // navitage('/admin/tool')
      }
    }
  };

  const handleSelectDepartament = async (e) => {
    setInput((old) => ({
      ...old,
      departament: e.map((option) => option.value.name),
    }));
    setErrors({
      name: "",
      departament: "",
    });
  };
  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>- EMPRESA -</h1>
        <label>
          <h5>Nombre Empresa:</h5>
          <div
            className={`${style.inputGroup} ${errors.name ? style.error : ""} `}
          >
            <FaUserCircle />
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Nombre de la empresa..."
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
          <h5>Departamento:</h5>
          <label className={style.wrapper}>
            <Select
              className={`${style.wrapper} ${
                errors.departament ? style.errorSelect : ""
              }`}
              onChange={(e) => handleSelectDepartament(e)}
              options={optionDepartament}
              placeholder="Departamento..."
              isMulti
              dropdownIndicator
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
          <button type="submit">Agregar Empresa</button>
        </div>
      </form>
    </div>
  );
}
