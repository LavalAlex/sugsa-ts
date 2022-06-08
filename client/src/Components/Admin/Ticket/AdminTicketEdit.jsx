import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { BiEditAlt } from "react-icons/bi";
import {
  allTechnicals,
  deleteTicketAdmin,
  editTicketAdmin,
} from "../../../Redux/Actions/Admin";
import { optionSelectTechnical } from "../../../Utils/optionTechnical";

import { utilDate } from "../../../Utils/tableUtils";
import style from "./AdminTicketEdit.module.css";
import { inputTicketEdit } from "../../../Utils/validateTicket";
import { lowerCaseString } from "../../../Utils/lowerCase";

export default function AdminTicketEdit({ data, isTicket }) {
  const dispatch = useDispatch();
  const [editClass, setEditClass] = useState(true);
  const [editAssig, setEditAssig] = useState(true);
  const technicals = useSelector((state) => state.technical.technical);
  const [optionTechnical, setOptionTecnical] = useState([]);

  useEffect(() => {
    dispatch(allTechnicals());
  }, [editAssig]);

  useEffect(() => {
    if (technicals[0]) {
      setOptionTecnical(optionSelectTechnical(technicals));
    } else {
      dispatch(allTechnicals());
      setOptionTecnical([]);
    }
  }, [editAssig]);

  const [dataEdit, setDataEdit] = useState({
    classification: "",
    assigned: "",
    tech_descrip: "",
  });
  const [errors, setErrors] = useState({ classification: "", assigned: "" });

  const handleChange = ({ target: { name, value } }) => {
    setDataEdit((old) => ({ ...old, [name]: value }));
    setErrors({
      classification: "",
      assigned: "",
      error: "",
    });
  };

  const handleUpdate = async () => {
    const update = inputTicketEdit(dataEdit);
    if (update.error) {
      setErrors((old) => ({
        error: update.error,
      }));
    } else {
      dispatch(editTicketAdmin(data._id, update));
      alert("El ticket se actualizó correctamente!");
      isTicket();
    }
  };

  const handleDelete = async () => {
    var conf = window.confirm("Seguro que quiere eliminar este Ticket?");
    if (conf) {
      dispatch(deleteTicketAdmin(data._id));
      alert("Ticket eliminado con éxitos!");
    }
    isTicket();
  };

  const handleClose = async () => {
    var conf = window.confirm("Seguro que quiere cerrar el Ticket?");
    if (conf) {
      dispatch(editTicketAdmin(data._id, { close: true }));
      alert("Ticket cerrado con éxito, pendiente de feedback!");
    }
    isTicket();
  };

  const handleTechnical = (e) => {
    setDataEdit((old) => ({ ...old, assigned: e.value }));
  };

  return (
    <div className={style.container} key={data._id}>
      <div className={style.title}>
        <h1>Ticket</h1>
      </div>
      <div className={style.data}>
        <div>
          <h4>Nro Ticket:</h4>
          <span>{data._id}</span>
        </div>
        <div>
          <h4>Nombre:</h4>
          <span>{lowerCaseString(data.name)}</span>
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
          <h4>Fecha de apertura:</h4>
          <span>{utilDate(data.createdAt)}</span>
        </div>
      </div>

      <div
        className={data.status === "Active" ? style.edit : style.editFeedback}
      >
        <div className={style.descrip}>
          <h4>Descripción:</h4>
          <div>{data.description}</div>
        </div>

        <div className={style.containerEdit}>
          {errors.error ? (
            <span className={style.errorSpan}>{errors.error}</span>
          ) : (
            ""
          )}
        </div>
        {data.status === "Active" ? (
          <div>
            <h4>
              Técnico Asignado:
              <button
                title="Editar Técnico"
                className={style.btn}
                onClick={() => setEditAssig((old) => !old)}
              >
                <BiEditAlt
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                />
              </button>{" "}
            </h4>
            <label>
              {editAssig ? (
                <div>
                  {data.assigned_technical.name.toUpperCase()}{" "}
                  {data.assigned_technical.last_name.toUpperCase()}
                </div>
              ) : (
                <div className={style.wrapper}>
                  <Select
                    className={style.select}
                    onChange={(e) => handleTechnical(e)}
                    options={optionTechnical}
                    placeholder="Técnico..."
                  />
                </div>
              )}
            </label>
          </div>
        ) : (
          <div className={style.wrapper}>
            <h4> Técnico Asignado:</h4>

            <div>
              {data.assigned_technical.name.toUpperCase()}
              {data.assigned_technical.last_name.toUpperCase()}
            </div>
          </div>
        )}

        {data.status === "Active" ? (
          <div>
            <h4>
              Tipo de Ticket:
              <button
                title="Editar tipo Ticket"
                className={style.btn}
                onClick={() => setEditClass((old) => !old)}
              >
                <BiEditAlt
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                />
              </button>
            </h4>

            {editClass ? (
              <div>{data.classification.toUpperCase()}</div>
            ) : (
              <label className={style.wrapper}>
                <div
                  className={`${style.inputGroup} ${
                    errors.classification ? style.error : ""
                  } `}
                >
                  <input
                    value={dataEdit.classification}
                    onChange={handleChange}
                    name="classification"
                    type="text"
                    placeholder="Tipo de ticket..."
                    autoComplete="off"
                  />
                </div>
                {errors.classification ? (
                  <span className={style.errorSpan}>
                    {errors.classification}
                  </span>
                ) : (
                  ""
                )}
              </label>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      {data.status === "Close" || data.status === "Cancel" ? (
        <div className={style.feedback}>
          <h4>Feedback del Usuario:</h4>
          <div>{data.feedback.toUpperCase()}</div>
        </div>
      ) : data.status === "Pending_Feedback" ? (
        <div className={style.feedback}>
          <h4>Feedback del Usuario:</h4>
          <div>Todavia no hay feedback del usuario...</div>
        </div>
      ) : (
        ""
      )}

      <div className={style.buttonContainer}>
        {data.feedback === "false" &&
        data.status != "Close" &&
        data.status != "Cancel" ? (
          <div className={`${style.btn} + ${style.save}`}>
            <button
              type="submit"
              onClick={handleUpdate}
              title="Guardar Cambios"
            >
              GUARDAR
            </button>
          </div>
        ) : (
          ""
        )}
        {data.feedback === "false" &&
        data.status != "Close" &&
        data.status != "Cancel" ? (
          <div className={`${style.btn} + ${style.close}`}>
            <button type="submit" onClick={handleClose} title="Cerrar Ticket">
              CERRAR
            </button>
          </div>
        ) : (
          ""
        )}
        <div className={`${style.btn} + ${style.delete}`}>
          <button type="submit" onClick={handleDelete} title="Eliminar Ticket">
            ELIMINAR
          </button>
        </div>
      </div>
    </div>
  );
}
