import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";

import { BiEditAlt } from "react-icons/bi";

import style from "./Departament.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  allDepartament,
  createDepartament,
  updateDepartamentAdmin,
} from "../../../../Redux/Actions/Departament";
import { lowerCaseString } from "../../../../Utils/lowerCase";
import { TiDeleteOutline } from "react-icons/ti";

export default function Departament() {
  const dispatch = useDispatch();

  const navitage = useNavigate();
  const [editOn, setEditOn] = useState(false);

  const allDepartaments = useSelector((state) => state.departament.departament);

  useEffect(() => {
    dispatch(allDepartament());
  }, []);
  const [errors, setErrors] = useState({
    name: "",
  });

  const [input, setInput] = useState({
    name: "",
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
    if (input.name === "") {
      setErrors((old) => ({
        ...old,
        name: "Debe colocar un nombre de departamento!",
      }));
    } else {
      var conf = window.confirm(
        "Esta seguro que quiere crear el departamento?"
      );
      if (conf) {
        dispatch(createDepartament(input.name));
        alert("Departamento creado con éxitos!");
        setInput({ name: "" });
      } else {
        alert("El departamento NO se creo!");
        setInput({ name: "" });
      }
    }
    dispatch(allDepartament());
  };

  const handleDelete = async (e) => {
    const code = await dispatch(updateDepartamentAdmin(e));
    console.log(code)
    dispatch(allDepartament());

  };

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>- DEPARTAMENTOS -</h1>
        <label>
          <h5>Nombre Departamento:</h5>
          <div
            className={`${style.inputGroup} ${errors.name ? style.error : ""} `}
          >
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Nombre departamento..."
              autoComplete="off"
            />
          </div>
          <div className={style.buttonContainer}>
            <button type="submit">Agregar</button>
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
          <h5>Departamentos:</h5>
          {allDepartaments ? (
            allDepartaments.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`${style.inputGroup} ${
                    errors.last_name ? style.error : ""
                  } `}
                >
                  <input
                    value={e.name.toUpperCase()}
                    name="last_name"
                    onChange={(e) => handleChange(e)}
                  />
                  <TiDeleteOutline
                    className={style.icon}
                    title="Eliminar Departamento"
                    onClick={() => handleDelete(e)}
                  />
                </div>
              );
            })
          ) : (
            <div>No hay departamentos cargados</div>
          )}
        </label>
      </form>
    </div>
  );
}
