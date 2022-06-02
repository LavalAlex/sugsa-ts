import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTicketAdmin } from "../../../Redux/Actions/Admin";
import { utilDate } from "../../../Utils/tableUtils";
import {
  inputTicketEdit,
  validateDescirption,
} from "../../../Utils/validateTicket";

import {useNavigate} from 'react-router-dom'

import style from "./AdminFollowing.module.css";

export default function AdminFollowing({ data, isTicket }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ tech_descrip: "" });
  const navigate = useNavigate()

  const [dataEdit, setDataEdit] = useState({
    tech_descrip: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setDataEdit((old) => ({ ...old, [name]: value }));
    setErrors({
      tech_descrip: "",
    });
  };

  const handleUpdate = async () => {
    const update = validateDescirption(dataEdit);
    if (update.error) {
      setErrors((old) => ({
        tech_descrip: update.error,
      }));
    } else {
      dispatch(editTicketAdmin(data._id, dataEdit));
      alert("The ticket has been updated!");
      isTicket()
    }
  };

  const handleClose = ()=>{
    isTicket()

  }

  return (
    <div className={style.container} key={data._id}>
      <div className={`${style.title} ${data.status === "Close" ? style.close: ""}`}>
        <h1> {data.status != "Close" ? "Ticket" : "TICKET CERRADO"}</h1>
      </div>
      <div className={style.data}>
        <div>
          <h4>Nro Ticket:</h4>
          <span>{data.id}</span>
        </div>
        <div>
          <h4>Nombre:</h4>
          <span>{data.name}</span>
        </div>
        <div>
          <h4>Empresa:</h4>
          <span>{data.business}</span>
        </div>
        <div>
          <h4>Departamento:</h4>
          <span>{data.departament}</span>
        </div>
        <div>
          <h4>Fecha de Apertura:</h4>
          <span>{utilDate(data.createdAt)}</span>
        </div>
      </div>
      <div className={style.history}>
        <div className={style.technical}>
          <h4>Técnico: </h4>
          <span>
            {data.assigned_technical.name} {data.assigned_technical.last_name}
          </span>
        </div>

        {data.register.map((e) => {
          return (
            <div className={style.frame}>
              <div>
                <span>{utilDate(e.date_register)}</span>
              </div>
              <div className={style.description}>
                <span>{e.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {data.status != "Close" ? (

      <div className={style.frame_description}>
        <h4>Avances del Técnico </h4>

        <label className={style.wrapper}>
          <div
            className={`${style.inputGroup} ${
              errors.tech_descrip ? style.error : ""
            } `}
          >
            <textarea
              value={dataEdit.tech_descrip}
              onChange={handleChange}
              name="tech_descrip"
              type="text"
              placeholder="Description..."
              autoComplete="off"
              cols={80}
              maxLength={200}
            />
          </div>

          <div></div>
          {errors.tech_descrip ? (
            <span className={style.errorSpan}>{errors.tech_descrip}</span>
          ) : (
            <span className={style.chart}>
              {200 - dataEdit.tech_descrip.length} Caracteres disponibles
            </span>
          )}
        </label>
            <div className={style.containerBtn}>

          <button onClick={handleUpdate}>Agregar</button>
          <button onClick={handleClose}>Salir</button>
            </div>

    
      </div>    ) : (
        <div className={style.frame_description}>
            <h4>Feedback del Usuario: </h4>
          <span>{data.feedback}</span>
        </div>
      )}
    </div>
  );
}
