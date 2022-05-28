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
    close: "",
  });
  const [errors, setErrors] = useState({ classification: "", assigned: "" });

  const handleChange = ({ target: { name, value } }) => {
    setDataEdit((old) => ({ ...old, [name]: value }));
    setErrors({
      classification: "",
      assigned: "",
    });
  };

  const handleUpdate = async () => {
    if (!dataEdit.assigned) {
      const update = { classification: dataEdit.classification };
      dispatch(editTicketAdmin(data._id, update));
    } else {
      if (!dataEdit.classification) {
        const update = { assigned: dataEdit.assigned };
        dispatch(editTicketAdmin(data._id, update));
      } else {
        dispatch(editTicketAdmin(data._id, dataEdit));
      }
    }
    alert("The ticket has been updated!");
    isTicket();
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

  const handleTechnical = (e)=>{
    setDataEdit((old)=>({...old, assigned: e.value }))
  }

  return (
    <div className={style.container} key={data._id}>
      <div className={style.title}>
        <h1>Ticket</h1>
      </div>
      <div className={style.data}>
        <div>
          <h4>Name:</h4>
          <span>{data.name}</span>
        </div>
        <div>
          <h4>Business:</h4>
          <span>{data.business}</span>
        </div>
        <div>
          <h4>Departament:</h4>
          <span>{data.departament}</span>
        </div>
        <div>
          <h4>Date:</h4>
          <span>{utilDate(data.createdAt)}</span>
        </div>
      </div>

      {data.feedback === "false" ? (
        <div className={style.edit}>
          <h4>Description:</h4>
          <div>{data.description}</div>
          <h4>
            Classification:
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
                <span className={style.errorSpan}>{errors.classification}</span>
              ) : (
                ""
              )}
            </label>
          )}
          <h4>
            Assigned Technician:
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

          {editAssig ? (
            <div>
              {!data.assigned_technician || data.assigned_technician == "false"
                ? "Unassigned at the moment"
                : data.assigned_technician.toUpperCase()}
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
      ) : (
        <div className={style.edit}>
          <h4>Description:</h4>
          <div>{data.description}</div>
          <h4>Assigned Technician:</h4>
          <div>{data.assigned_technician}</div>
          <h4>Feedback</h4>
          <div>{data.feedback}</div>
        </div>
      )}

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
