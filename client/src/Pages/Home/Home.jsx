import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allTickets } from "../../Redux/Actions/Ticket";

import styles from "./Home.module.css";
import NewTicket from "../../Components/Ticket/NewTicket";
import TicketDetails from "../../Components/Ticket/TicketDetails";

import Table from "../../Components/Table/Tables";
export default function Home() {
  const dispatch = useDispatch()
  const [newTicket, setNewTicket] = useState(false);
  const [detailTicket, setDetailTicket] = useState(false)
  const tickets = useSelector((state) => state.tickets.tickets)
  const [ticketId, setTicketId] = useState('')

  useEffect(()=>{
    dispatch(allTickets())
  },[newTicket])

  const isTicket = ()=>{
    setNewTicket((old) => !old)
  }
  
  return (
    <div className={styles.container}>
          <div className={styles.containerNewUser}>
        {newTicket ? (
          <div
            className={styles.newTicket}
            id="close"
            onClick={(e) =>
              e.target.id === "close" ? setNewTicket((old) => false) : ""
            }
          >
            <NewTicket isTicket={setNewTicket} />
          </div>
        ) : (
          ""
        )}
        {detailTicket ? (
          <div
            className={styles.newTicket}
            id="close"
            onClick={(e) =>
              e.target.id === "close" ? setDetailTicket((old) => false) : ""
            }
          >
            <TicketDetails data={tickets[ticketId]} />
          </div>
        ) : (
          ""
        )}
      </div>
      <Table tickets={tickets} setTicketId={setTicketId} setDetailTicket={setDetailTicket} isTicket={isTicket}/>
    </div>
  );
}
