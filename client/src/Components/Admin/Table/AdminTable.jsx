import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

import { BiCommentAdd, BiAddToQueue } from "react-icons/bi";
import styles from "./AdminTables.module.css";
import { avatarUser, registerUtil, utilDate } from "../../../Utils/tableUtils";
import { useDispatch } from "react-redux";
import { filterTicketAdmin } from "../../../Redux/Actions/Admin";
import { allTickets } from "../../../Redux/Actions/Ticket";

import { RiAlignJustify } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function AdminTables({
  tickets,
  setTicketId,
  setDetailTicket,
  setFollowingTicket,
  setNewAdminTicket,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  console.log(tickets);
  return (
    <Card className={styles.container}>
      <CardBody>
        <CardTitle className={styles.title}>
          <h2>TIKET</h2>

          <div
            title="New Ticket"
            className={styles.btn}
            onClick={handleNewTicket}
          >
            <div>NUEVO TICKET</div>
            <BiAddToQueue className={styles.icon} />
          </div>
        </CardTitle>
        <Table responsive striped>
          <thead>
            <tr className={styles.headerTable}>
              <th>
                <div className={styles.titleId}>CASO</div>
              </th>
              <th>
                <div className={styles.titleUser}>USUARIO</div>
              </th>
              <th>
                <div className={styles.titleDate}>FECHA</div>
              </th>
              <th>
                <div className={styles.titleClassification}>MOTIVO</div>
              </th>
              <th>
                <div className={styles.titleDescription}>DESCRIPCION</div>
              </th>
              <th>
                <div className={styles.titleDate}>FECHA</div>
              </th>
              <th>
                <div className={styles.titleDescriTech}>
                  SEGUIMIENTO DE TICKET
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets
              ? tickets.map((e, index) => (
                  <tr key={index}>
                    <td
                      className={`${
                        index % 2 == 0
                          ? styles.cardContainer
                          : styles.cardContainerPar
                      }`}
                    >
                      <td>
                        <div className={styles.idUser}>{e.id}</div>
                      </td>
                      <td>
                        <div className={styles.bodyUser}>
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
                            <h5>{e.last_name}</h5>
                            <span>{e.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.date}>
                          <span>
                            {e.status != "Close"
                              ? utilDate(e.createdAt)
                              : "CERRADO"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.classification}>
                          <span>
                            {e.status != "Close" ? e.classification : ""}
                          </span>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div className={styles.description}>
                          <span>
                            {e.status != "Close" ? e.description : ""}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.date}>
                          <span>
                            {e.status != "Close"
                              ? utilDate(
                                  e.register[e.register.length - 1]
                                    .date_register
                                )
                              : ""}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className={styles.description}>
                          <span>
                            {e.status != "Close"
                              ? e.register[e.register.length - 1].description
                              : ""}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          onClick={() => handleFollowing(index)}
                          title="Seguimiento"
                          className={styles.iconFollow}
                        >
                          <RiAlignJustify
                            style={{ width: "2em", height: "2em" }}
                          />
                        </div>
                      </td>
                    </td>
                  </tr>
                ))
              : "NOT FOUND"}
          </tbody>
        </Table>
      </CardBody>
    </Card>
    // <div className={styles.container}>
    //   <Card>
    //     <CardBody>
    //       <CardTitle>
    //         <div className={styles.title}>
    //           <h3>TIKETS</h3>
    //           <div
    //             title="New Ticket"
    //             className={styles.btn}
    //             onClick={handleNewTicket}
    //           >
    //             <BiAddToQueue
    //               style={{
    //                 width: "2em",
    //                 height: "2em",
    //               }}
    //             />
    //           </div>
    //           {/* <div
    //             title="New Ticket"
    //             className={styles.btn}
    //             onClick={handleNewTicket}
    //           >
    //             <BiAddToQueue
    //               style={{
    //                 width: "2em",
    //                 height: "2em",
    //               }}
    //             />
    //           </div> */}
    //           {/* <div className={styles.selectStatus}>
    //             <select onChange={(e) => handleFilter(e)}>
    //               <option>Status</option>
    //               <option>Active</option>
    //               <option>Pending</option>
    //               <option>Pending Feedback</option>
    //               <option>Close</option>
    //               <option>Cancel</option>
    //             </select>
    //           </div> */}
    //         </div>
    //       </CardTitle>

    //       <Table responsive>
    //         <thead>
    //           <div className={styles.headerTable}>
    //             <th>Info User</th>
    //             <th className={styles.headerStatus}>Status</th>
    //             <th className={styles.headerDate}>
    //               <span>Date</span>
    //             </th>
    //           </div>
    //         </thead>
    //         <tbody>
    //           {tickets
    //             ? tickets.map((e, index) => (
    //                 <tr key={index}>
    //                   <div className={styles.cardContainer}>
    //                     <td>
    //                       <div className={styles.date}>
    //                         <span>{e.id}</span>
    //                       </div>
    //                     </td>
    //                     <td>
    //                       <div className={styles.cardBody}>
    //                         <div>
    //                           <img
    //                             src={avatarUser(index)}
    //                             className={styles.avatar}
    //                             alt="avatar"
    //                             width="45"
    //                             height="45"
    //                           />
    //                         </div>

    //                         <div
    //                           className={styles.infoUser}
    //                           title="Detalle del Ticktet"
    //                           onClick={() => handleSubmit(index)}
    //                         >
    //                           <h5>{e.name}</h5>
    //                           <span>{e.email}</span>
    //                         </div>
    //                       </div>
    //                     </td>

    //                     <td>
    //                       <div className={styles.date}>
    //                         <span>
    //                           {e.status != "Close"
    //                             ? utilDate(e.createdAt)
    //                             : "CERRADO"}
    //                         </span>
    //                       </div>
    //                     </td>

    //                     <td>
    //                       <div className={styles.status}>
    //                         <span>
    //                           {e.status != "Close" ? e.description : ""}
    //                         </span>
    //                       </div>
    //                     </td>

    //                     <td>
    //                       <div className={styles.status}>
    //                         <span>
    //                           {e.status != "Close" ? e.classification : ""}
    //                         </span>
    //                       </div>
    //                     </td>
    //                     {/* <td>
    //                       <div className={styles.status}>
    //                         <span>{e.status}</span>
    //                       </div>
    //                     </td> */}

    //                     <td>
    //                       <div className={styles.status}>
    //                         <span>
    //                           {e.status != "Close"
    //                             ? e.register[e.register.length - 1].description
    //                             : ""}
    //                         </span>
    //                       </div>
    //                     </td>

    //                     <td>
    //                       <div className={styles.status}>
    //                         <span>
    //                           {e.status != "Close"
    //                             ? utilDate(
    //                                 e.register[e.register.length - 1]
    //                                   .date_register
    //                               )
    //                             : ""}
    //                         </span>
    //                       </div>
    //                     </td>

    //                     <td>
    //                       <div
    //                         onClick={() => handleFollowing(index)}
    //                         title="Seguimiento"
    //                         className={styles.btn}
    //                       >
    //                         <RiAlignJustify
    //                           style={{ width: "2em", height: "2em" }}
    //                         />
    //                       </div>
    //                     </td>
    //                   </div>
    //                 </tr>
    //               ))
    //             : "Not Found"}
    //         </tbody>
    //       </Table>
    //     </CardBody>
    //   </Card>
    // </div>
  );
}
