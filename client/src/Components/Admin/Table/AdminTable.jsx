import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

import { BiCommentAdd, BiAddToQueue } from "react-icons/bi";
import styles from "./AdminTables.module.css";
import {
  avatarUser,
  registerUtil,
  utilDate,
  statusTitle,
} from "../../../Utils/tableUtils";
import { useDispatch, useSelector } from "react-redux";
import { filterTicketAdmin } from "../../../Redux/Actions/Admin";
import { allTickets } from "../../../Redux/Actions/Ticket";

import { RiAlignJustify } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PaginationCardAdmin from "../Pagination/PaginationCardAdmin";
import { lowerCaseString } from "../../../Utils/lowerCase";
import SearchBar from "../SearchBar/SearchBar";

const statusDir = {
  Activo: "Active",
  Todos: "Status",
  Pendiente: "Pending_Feedback",
  Cerrado: "Close",
  Cancelado: "Cancel",
};

export default function AdminTables({
  tickets,
  setTicket,
  setDetailTicket,
  setFollowingTicket,
  setNewAdminTicket,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authAdmin.user.token)

  //Seteo de cantidad de recetas por pagina
  const [currentPage, setCurrentPage] = useState(1); //Pagina actual
  const [rowPerPage, setRowPerPage] = useState(5); //Cantidad de recetas por pagina
  const indexOfLastRow = currentPage * rowPerPage; //9
  const indexOfFirstRow = indexOfLastRow - rowPerPage; //0--9--18--
  const currentRow = tickets.slice(indexOfFirstRow, indexOfLastRow);

  const [n, setN] = useState(0);

  //Setea la cantidad de paginas renderizadas
  const paginado = (pageNumber) => {
    setN(pageNumber);
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDetail = (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTicket(id);
    setDetailTicket(true);
  };

  const handleFollowing = (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTicket(id);
    setFollowingTicket(true);
  };

  const handleNewTicket = () => {
    setNewAdminTicket(true);
  };

  const handleFilter = async ({ target: { name, value } }) => {
    const code = await dispatch(filterTicketAdmin(statusDir[value], token));
    paginado(1)
  };

  const handleSelect = ({ target: { name, value } }) => {
    setRowPerPage(parseInt(value));
  };

  return (
    <Card className={styles.container}>
      <CardBody>
        <CardTitle className={styles.title}>
          {/* <SearchBar/> */}
          <h2>TIKET</h2>

          <div className={styles.selectStatus}>
            <select onChange={(e) => handleFilter(e)}>
              <option>Todos</option>
              <option>Activo</option>
              <option>Pendiente</option>
              <option>Cerrado</option>
              <option>Cancelado</option>
            </select>
          </div>

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
            <tr >
              <div className={styles.bodyContainer}>

        
              {currentRow[0] ? (
                currentRow.map((e, index) => (
                  <tr key={index}>
                    <div className={styles.cardContainer}>
                      <td>
                        <div className={styles.idUser}>{e._id}</div>
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
                            onClick={() => handleDetail(e)}
                          >
                            <h5>{lowerCaseString(e.name)}</h5>
                            <h5>{lowerCaseString(e.last_name)}</h5>
                            <span>{e.email}</span>
                          </div>
                        </div>
                      </td>
                  
                      <td>
                        <div className={styles.date} title={e.status === "Active"? "Apertura de Ticket": "Cerrado/Cancelado de Ticket"}>
                          <span>{ e.status === "Active" ? utilDate(e.createdAt): utilDate(e.closeAt)}</span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.classification} title="Clasificación de Ticket">
                          <span>
                            {e.status === "Active" ? e.classification : ""}
                          </span>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div className={styles.description}>
                          <span>
                            {e.status === "Active"
                              ? e.description
                              : statusTitle(e.status)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.date} title="Último Reporte">
                          <span>
                            {e.status === "Active"
                              ? utilDate(
                                  e.register[e.register.length - 1]
                                    .date_register
                                )
                              : ""}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className={styles.descriptionTech}>
                          <span>
                            {e.status === "Active"
                              ? e.register[e.register.length - 1].description
                              : ""}
                          </span>
                        </div>
                      </td>



                      <td>
                        <div
                          onClick={() => handleFollowing(e)}
                          title="Seguimiento de Ticket"
                          className={styles.iconFollow}
                        >
                          <RiAlignJustify
                            style={{ width: "2em", height: "2em" }}
                          />
                        </div>
                      </td>
                    </div>
                  </tr>
                ))
              ) : (
                <div className={styles.notFound}>
                  <h3>NO HAY TICKET</h3>
                </div>
              )}
                    </div>
            </tr>
          </tbody>
          {currentRow[0] ? (
            <div className={styles.page}>
              <div>
                {tickets.length >= 5
                  ? `Pagina ${currentPage} de ${Math.ceil(
                      tickets.length / rowPerPage
                    )}`
                  : ""}
              </div>
              {tickets.length >= 5 ? (
                <PaginationCardAdmin
                  rowPerPage={rowPerPage}
                  allRow={tickets.length}
                  paginado={paginado}
                  m={currentPage}
                  handleSelect={handleSelect}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
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
