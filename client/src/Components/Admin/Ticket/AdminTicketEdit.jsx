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
      alert("The ticket has been updated!");
      isTicket();
    }
  };

  const handleDelete = async () => {
    var conf = window.confirm("Do you want to delete the ticket?");
    if (conf) {
      dispatch(deleteTicketAdmin(data._id));
      alert("Deleted Successfully");
    }
    isTicket();
  };

  const handleClose = async () => {
    var conf = window.confirm("Do you want to close the ticket?");
    if (conf) {
      dispatch(editTicketAdmin(data._id, { close: true }));
      alert("Closed successfully ticket, pending a feedback!");
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
          <h4>Fecha de apertura:</h4>
          <span>{utilDate(data.createdAt)}</span>
        </div>
      </div>

      <div className={style.edit}>
        <h4>Descripción:</h4>
        <div>{data.description}</div>

        <div className={style.containerEdit}>
          {errors.error ? (
            <span className={style.errorSpan}>{errors.error}</span>
          ) : (
            ""
          )}
          {data.status != "Close" ? (
            <div>
              <h4>
                Tipo de Ticket:
                <button
                  title="Edit Ticket"
                  className={style.btn}
                  onClick={() => setEditClass((old) => !old)}
                >
                  <BiEditAlt
                    style={{
                      width: "2em",
                      height: "2em",
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
                      placeholder="Classification..."
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

          <div>
            {data.status != "Close" ? (
              <h4>
                Técnico Asignado:
                <button
                  title="Edit Ticket"
                  className={style.btn}
                  onClick={() => setEditAssig((old) => !old)}
                >
                  <BiEditAlt
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                  />
                </button>{" "}
              </h4>
            ) : (
              <h4> Técnico Asignado:</h4>
            )}

            {editAssig ? (
              <div>
                {!data.assigned_technical || data.assigned_technical == "false"
                  ? "Unassigned at the moment"
                  : `${data.assigned_technical.name.toUpperCase()} ${data.assigned_technical.last_name.toUpperCase()}`}
              </div>
            ) : (
              <label className={style.wrapper}>
                <label className={style.wrapper}>
                  <Select
                    className={`${style.wrapper} ${
                      errors.departament ? style.errorSelect : ""
                    }`}
                    onChange={(e) => handleTechnical(e)}
                    options={optionTechnical}
                    placeholder="Technical..."
                  />
                </label>

                {errors.assigned ? (
                  <span className={style.errorSpan}>{errors.assigned}</span>
                ) : (
                  ""
                )}
              </label>
            )}
          </div>
        </div>

        {data.status === "Close" ? (
          <div>
            <h4>Feedback del Usuario:</h4>
            <div>{data.feedback}</div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={style.buttonContainer}>
        {data.feedback === "false" &&
        data.status != "Close" &&
        data.status != "Cancel" ? (
          <div className={`${style.btn} + ${style.save}`}>
            <button type="submit" onClick={handleUpdate}>
              SAVE
            </button>
          </div>
        ) : (
          ""
        )}
        {data.feedback === "false" &&
        data.status != "Close" &&
        data.status != "Cancel" ? (
          <div className={`${style.btn} + ${style.close}`}>
            <button type="submit" onClick={handleClose}>
              CLOSE
            </button>
          </div>
        ) : (
          ""
        )}
        <div className={`${style.btn} + ${style.delete}`}>
          <button type="submit" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
