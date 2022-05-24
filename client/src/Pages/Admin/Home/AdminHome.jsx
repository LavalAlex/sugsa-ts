import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTables from "../../../Components/Admin/Table/AdminTable";


import styles from "./AdminHome.module.css";

import AdminTicketEdit from "../../../Components/Admin/Ticket/AdminTicketEdit";
import { allTicketsAdmin } from "../../../Redux/Actions/Admin";

export default function AdminHome() {
  const dispatch = useDispatch();
  const [newTicket, setNewTicket] = useState(false);
  const [editTicket, setDetailTicket] = useState(false);
  const tickets = useSelector((state) => state.tickets.tickets);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    dispatch(allTicketsAdmin());
  }, [newTicket]);

  const isTicket = () => {
    dispatch(allTicketsAdmin());
    setDetailTicket((old) => false)
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerNewUser}>
        {editTicket ? (
          <div
            className={styles.newTicket}
            id="close"
            onClick={(e) =>
              e.target.id === "close" ? setDetailTicket((old) => false) : ""
            }
          >
            <AdminTicketEdit data={tickets[ticketId]} isTicket={isTicket} />
          </div>
        ) : (
          ""
        )}
      </div>

      <AdminTables
        tickets={tickets}
        setTicketId={setTicketId}
        setDetailTicket={setDetailTicket}
        isTicket={isTicket}
      />
    </div>
  );
}
