import React, { useState } from "react";
import { utilDate } from "../../Utils/tableUtils";

import style from "./TicketDetails.module.css";

export default function TicketDetails({data }) {
  
  console.log(data)
  return (
    <div className={style.container} key={data.id}>
      <div className={style.title}>
        <h1>Ticket</h1>
      </div>
      <div className={style.data}>
        <h4>Name:</h4>
        <div>{data.name}</div>
        <h4>Date:</h4>
        <div>{utilDate(data.createdAt)}</div>
        <h4>Description:</h4>
        <div>{data.description}</div>
        <h4>Classification:</h4>
        <div>{data.classification}</div>
        <h4>Assigned Technician:</h4>
        <div>{!data.assigned_technician || data.assigned_technician=="false"? "Unassigned at the moment": data.assigned_technician }</div>
      </div> 
    </div>
  );
}
