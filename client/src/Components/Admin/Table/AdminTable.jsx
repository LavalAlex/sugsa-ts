import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

import { BiCommentAdd, BiAddToQueue } from "react-icons/bi";
import styles from "./AdminTables.module.css";
import { avatarUser, registerUtil, utilDate } from "../../../Utils/tableUtils";
import { useDispatch } from "react-redux";
import { filterTicketAdmin } from "../../../Redux/Actions/Admin";
import { allTickets } from "../../../Redux/Actions/Ticket";

import { RiAlignJustify } from "react-icons/ri";

export default function AdminTables({
  tickets,
  setTicketId,
  setDetailTicket,
  setFollowingTicket,
  setNewAdminTicket,
}) {
  const dispatch = useDispatch();

  const handleSubmit = (id) => {
    setTicketId(id);
    setDetailTicket(true);
  };

  const handleFollowing = (id) => {
    setTicketId(id);
    setFollowingTicket(true);
  };

  const handleNewTicket = () => {
    setNewAdminTicket(true);
  };

  const handleFilter = ({ target: { name, value } }) => {
    if (value === "Pending Feedback") {
      dispatch(filterTicketAdmin("Pending_Feedback"));
    } else {
      dispatch(filterTicketAdmin(value));
    }
  };

  

  return (
    <div className={styles.container}>
      <Card>
        <CardBody>
          <CardTitle>
            <div className={styles.title}>
              <h3>TIKETS</h3>
              <div
                title="New Ticket"
                className={styles.btn}
                onClick={handleNewTicket}
              >
                <BiAddToQueue
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                />
              </div>
              {/* <div
                title="New Ticket"
                className={styles.btn}
                onClick={handleNewTicket}
              >
                <BiAddToQueue
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                />
              </div> */}
              {/* <div className={styles.selectStatus}>
                <select onChange={(e) => handleFilter(e)}>
                  <option>Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Pending Feedback</option>
                  <option>Close</option>
                  <option>Cancel</option>
                </select>
              </div> */}
            </div>
          </CardTitle>

          <Table responsive>
            <thead>
              <div className={styles.headerTable}>
                <th>Info User</th>
                <th className={styles.headerStatus}>Status</th>
                <th className={styles.headerDate}>
                  <span>Date</span>
                </th>
              </div>
            </thead>
            <tbody>
              {tickets
                ? tickets.map((e, index) => (
                    <tr key={index}>
                      <div className={styles.cardContainer}>
                      <td>
                          <div className={styles.date}>
                            <span>{e.id}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.cardBody}>
                            <div>
                              <img
                                src={avatarUser(index)}
                                className={styles.avatar}
                                alt="avatar"
                                width="45"
                                height="45"
                              />
                            </div>

                            <div
                              className={styles.infoUser}
                              title="Detalle del Ticktet"
                              onClick={() => handleSubmit(index)}
                            >
                              <h5>{e.name}</h5>
                              <span>{e.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className={styles.date}>
                            <span>{e.status!="Close"?utilDate(e.createdAt):"CERRADO"}</span>
                          </div>
                        </td>

                        <td>
                          <div className={styles.status}>
                            <span>{e.status!="Close"?e.description:""}</span>
                          </div>
                        </td>

                        <td>
                          <div className={styles.status}>
                            <span>{e.status!="Close"?e.classification:""}</span>
                          </div>
                        </td>
                        {/* <td>
                          <div className={styles.status}>
                            <span>{e.status}</span>
                          </div>
                        </td> */}

                        <td>
                          <div className={styles.status}>
                            <span>
                              {e.status!="Close"?e.register[e.register.length - 1].description:""}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className={styles.status}>
                            <span>
                              {e.status!="Close"?utilDate(
                                e.register[e.register.length - 1].date_register
                              ):""}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div onClick={() => handleFollowing(index)}    title="Seguimiento"
                className={styles.btn}>
                            <RiAlignJustify
                              style={{ width: "2em", height: "2em" }}
                            />
                          </div>
                        </td>
                      </div>
                    </tr>
                  ))
                : "Not Found"}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
