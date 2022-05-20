import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { editTicketAdmin } from "../../../Redux/Actions/Admin";

import { utilDate } from "../../../Utils/tableUtils";
import { inputTicketEdit } from "../../../Utils/validateTicket";
import style from "./AdminTicketEdit.module.css";

export default function AdminTicketEdit({ data }) {
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
    console.log(data)

        console.log(data._id);
        dispatch(editTicketAdmin(data._id, dataEdit));
        alert("Thi the ticket Updated");
   
   
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
  console.log(data)
  return (
    <div className={style.container} key={data._id}>
      <div className={style.title}>
        <h1>Ticket</h1>
      </div>
      <div className={style.data}>
        <h4>Name:</h4>
        <div>{data.name}</div>
        <h4>Date:</h4>
        <div>{utilDate(data.createdAt)}</div>
        <h4>Business</h4>
        <div>{data.business}</div>
        <h4>Description:</h4>
        <div>{data.description}</div>
        <h4>
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
          Classification:
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
          Assigned Technician:
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
        <button type="submit" onClick={handleUpdate}>
          SAVE
        </button>
      </div>
    </div>
  );
}
