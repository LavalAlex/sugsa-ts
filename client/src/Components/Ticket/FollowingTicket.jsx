import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTicket } from "../../Redux/Actions/Ticket";
// import { editTicketAdmin } from "../../../Redux/Actions/Admin";
import { utilDate } from "../../Utils/tableUtils";
// import {
//   inputTicketEdit,
//   validateDescirption,
// } from "../../../Utils/validateTicket";

import style from "./FollowingTicket.module.css";

export default function FollowingTicket({ data, isFollowing }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ tech_descrip: "" });
  const user = useSelector((state) =>  state.auth.user)

  const [image, setImage] = useState()

  // setImage(data.image.data.toString('base64'))

  const [dataEdit, setDataEdit] = useState({
    tech_descrip: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setDataEdit((old) => ({ ...old, [name]: value }));
    setErrors({
      tech_descrip: "",
    });
  };

  //   const handleUpdate = async () => {
  //     const update = validateDescirption(dataEdit);
  //     if (update.error) {
  //       setErrors((old) => ({
  //         tech_descrip: update.error,
  //       }));
  //     } else {
  //       dispatch(editTicketAdmin(data._id, dataEdit));
  //       alert("The ticket has been updated!");
  //       isTicket();
  //     }
  //   };

 
  // console.log(image)
  // console.log(data.image.data.data)

  // console.log(data)
  const handleCancel = () => {
isFollowing()
  };

  return (
    <div className={style.container} key={data._id}>
      <div
        className={`${style.title} ${
          data.status === "Pending Feedback" ? style.close : ""
        }`}
      >
        <h1>
          {data.status != "Pending Feedback" ? "Ticket" : "TICKET CERRADO"}
        </h1>
        {data.status != "Pending Feedback" ? (
          <div>
            <div className={style.left}>
              <h4>Nro Ticket:</h4>
              <span>{data._id}</span>
            </div>
            <div className={style.center}>
              <h4>Técnico: </h4>
              <span>
                {data.assigned_technical.name}{" "}
                {data.assigned_technical.last_name}
              </span>
            </div>
            <div className={style.right}>
              <h4>Fecha:</h4>
              <span>{utilDate(data.createdAt)}</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={style.data}>
        <h4>Description:</h4>
        <div>{data.description}</div>
      
        {/* {data.image? (
         <img
         className={style.descrImage}
         src={`data:${data.image.mimetype};base64, ${data.image.data.data}`}
         alt={data.image.name}
       />
 
      ):("")} */}

      </div>

      <div className={style.history}>
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

      {data.status != "Pending Feedback" ? (
        <div className={style.buttonContainer}>
          <button type="submit" onClick={handleCancel}>
            Salir
          </button>
        </div>
      ) : (
        <div className={style.frame_description}>
          <h4>Pendiente de feedback: </h4>
          <span>
            Revisa tu correo, tienes 48hs para mandar tu feedback, gracias!
          </span>
        </div>
      )}
    </div>
  );
}
