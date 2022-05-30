import React from "react";
import { utilDate } from "../../../Utils/tableUtils";

import style from "./AdminFollowing.module.css";

export default function AdminFollowing({ data }) {
  console.log(data);
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
      <div className={style.history}>
      <h4>Historial:</h4>
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
    </div>
  );
}
