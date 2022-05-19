import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTickets } from "../../Redux/Actions/Ticket";
import TicketDetails from '../../Components/Ticket/TicketDetails'

export default function Notification() {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const tickets = useSelector((state) => state.tickets.tickets);
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(allTickets());
  }, []);

  console.log(tickets)
  return (
    <div>
      <div>Notification</div>

      {tickets
        ? tickets?.map((e) => {
            return (
              <TicketDetails
                key={e._id}
                name={e.name}
                email={e.email}
                description={e.description}
                classification={e.classification}
                assigned={e.assigned_technician}
                createdAt={e.createdAt}
              />
            );
          })
        : "Cargando..."}
    </div>
  );
}
