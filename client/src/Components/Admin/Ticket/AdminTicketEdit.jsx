import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  deleteTicketAdmin,
  editTicketAdmin,
} from "../../../Redux/Actions/Admin";

import { utilDate } from "../../../Utils/tableUtils";
import { inputTicketEdit } from "../../../Utils/validateTicket";
import style from "./AdminTicketEdit.module.css";

export default function AdminTicketEdit({ data, isTicket }) {
  const dispatch = useDispatch();
  const [editClass, setEditClass] = useState(true);
  const [editAssig, setEditAssig] = useState(true);

  const [dataEdit, setDataEdit] = useState({
    classification: "",
    assigned: "",
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
    dispatch(editTicketAdmin(data._id, dataEdit));
    alert("Thi the ticket Updated");
    isTicket();
  };

  const handleDelete = async () => {
    var conf = window.confirm("Do you want to deleted the user?");
    if (conf) {
      dispatch(deleteTicketAdmin(data._id));
      alert("Deleted Successfully");
    }
    isTicket();
  };

  // const handleEdit = (name) => {
  //   console.log(name);
  //   if (name === "classification") {
  //     setEdit((old) => ({
  //       ...old,
  //       classification: dataEdit.classification? false: true,
  //     }));
  //   } else {
  //     setEdit((old) => ({
  //       ...old,
  //       assigned: dataEdit.assigned? false: true,
  //     }));
  //   }
  // };

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
          <h4>Date:</h4>
          <span>{utilDate(data.createdAt)}</span>
        </div>
      </div>
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
          <div>{data.classification}</div>
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
              : data.assigned_technician}
          </div>
        ) : (
          <label className={style.wrapper}>
            <div
              className={`${style.inputGroup} ${
                errors.assigned ? style.error : ""
              } `}
            >
              <input
                value={dataEdit.assigned}
                onChange={handleChange}
                name="assigned"
                type="text"
                placeholder="Assigned..."
                autoComplete="off"
              />
            </div>
            {errors.assigned ? (
              <span className={style.errorSpan}>{errors.assigned}</span>
            ) : (
              ""
            )}
          </label>
        )}
      </div>

      <div className={style.buttonContainer}>
        <div className={`${style.btn} + ${style.save}`}>
          <button type="submit"  onClick={handleUpdate}>
            SAVE
          </button>
        </div>
        <div className={`${style.btn} + ${style.delete}`}>
          <button type="submit"  onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
