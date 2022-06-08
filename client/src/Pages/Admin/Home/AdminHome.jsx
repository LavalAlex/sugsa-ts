import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTables from "../../../Components/Admin/Table/AdminTable";


import styles from "./AdminHome.module.css";

import AdminTicketEdit from "../../../Components/Admin/Ticket/AdminTicketEdit";
import { allTicketsAdmin } from "../../../Redux/Actions/Admin";
import AdminFollowing from "../../../Components/Admin/Ticket/AdminFollowing";
import AdminNewTicket from "../../../Components/Admin/Ticket/AdminNewTicket";

export default function AdminHome() {
  const dispatch = useDispatch();
  const [newTicket, setNewTicket] = useState(false);
  const [editTicket, setDetailTicket] = useState(false);
  const tickets = useSelector((state) => state.tickets.tickets);
  // const [ticketId, setTicketId] = useState("");
  const token = useSelector((state) => state.authAdmin.user.token)
  const [followingTicket, setFollowingTicket] = useState(false)
  const [newAdminTicket, setNewAdminTicket] = useState(false)
  const [data, setData] = useState({})
  useEffect(() => {
    dispatch(allTicketsAdmin(token));
  }, [newTicket]);

  const isTicket = () => {
    dispatch(allTicketsAdmin(token));
    setDetailTicket((old) => false)
    setFollowingTicket((old) => false)
    setNewAdminTicket((old)=> false)
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
            <AdminTicketEdit data={data} isTicket={isTicket} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={styles.containerNewUser}>
        {followingTicket ? (
          <div
            className={styles.newTicket}
            id="close"
            onClick={(e) =>
              e.target.id === "close" ? setFollowingTicket((old) => false) : ""
            }
          >
            <AdminFollowing data={data} isTicket={isTicket} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={styles.containerNewUser}>
        {newAdminTicket ? (
          <div
            className={styles.newTicket}
            id="close"
            onClick={(e) =>
              e.target.id === "close" ? setNewAdminTicket((old) => false) : ""
            }
          >
            <AdminNewTicket  isTicket={isTicket} />
          </div>
        ) : (
          ""
        )}
      </div>
   

      <AdminTables
        tickets={tickets}
        setTicket={setData}
        setDetailTicket={setDetailTicket}
        isTicket={isTicket}
        setFollowingTicket={setFollowingTicket}
        setNewAdminTicket={setNewAdminTicket}
      />
    </div>
  );
}
