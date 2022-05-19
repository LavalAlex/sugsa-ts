import React, { useState } from "react";
import { utilDate } from "../../Utils/tableUtils";

import style from "./TicketCard.module.css";

export default function TicketDetails({data }) {
  
  return (
    <div className={style.container} key={data.id}>
      <div className={style.title}>
        <h1>Ticket</h1>
      </div>
      <div className={style.data}>
        <h5>Name:</h5>
        <div>{data.name}</div>
        <h5>Date:</h5>
        <div>{utilDate(data.createdAt)}</div>
        <h5>Description:</h5>
        <div>{data.description}</div>
        <h5>Classification:</h5>
        <div>{data.classification}</div>
        <h5>Assigned Technician:</h5>
        <div>{!data.assigned || data.assigned=="false"? "Unassigned at the moment": data.assigned }</div>
      </div> 
    </div>
  );
}
