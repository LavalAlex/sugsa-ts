import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

import { BiCommentAdd, BiAddToQueue } from "react-icons/bi";
import styles from "./Tables.module.css";
import { avatarUser, utilDate } from "../../Utils/tableUtils";
import { useDispatch } from "react-redux";
import { RiAlignJustify, RiArrowUpDownFill } from "react-icons/ri";
import PaginationCard from "../Pagination/PaginationCard";
import { useState } from "react";
import { orderTicket } from "../../Redux/Actions/Ticket";
import { lowerCaseString } from "../../Utils/lowerCase";

export default function Tables({
  tickets,
  setTicketId,
  setDetailTicket,
  isTicket,
  setFollowTicket,
}) {
  const dispatch = useDispatch();

  //Seteo de cantidad de recetas por pagina
  const [currentPage, setCurrentPage] = useState(1); //Pagina actual
  const [rowPerPage, setRowPerPage] = useState(5); //Cantidad de recetas por pagina
  const indexOfLastRow = currentPage * rowPerPage; //9
  const indexOfFirstRow = indexOfLastRow - rowPerPage; //0--9--18--
  const currentRow = tickets[0]? tickets.slice(indexOfFirstRow, indexOfLastRow): [];
  const [up, setUp] = useState(false);

  const [n, setN] = useState(0);

  //Setea la cantidad de paginas renderizadas
  const paginado = (pageNumber) => {
    setN(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleSubmit = (id) => {
    setTicketId(id);
    setDetailTicket(true);
  };

  const handleNewTicket = () => {
    isTicket();
  };

  const handleFollowing = (id) => {
    setTicketId(id);
    setFollowTicket(true);
  };

  const handleOrder = () => {
    setUp((old) => !old);
    dispatch(orderTicket(up));
  };


  return (
    <div className={styles.container}>
      <Card>
        <CardBody>
          <CardTitle div className={styles.title}>
            <div onClick={handleOrder} >
        
              <RiArrowUpDownFill className={styles.icon} />
            
            </div>
            <h2>TIKETS</h2>
            <div
              title="New Ticket"
              className={styles.btn}
              onClick={handleNewTicket}
            >
              <div>NUEVO TICKET</div>
              <BiAddToQueue className={styles.icon} />
            </div>
          </CardTitle>

          <Table responsive>
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
                  <div className={styles.titleDescription}>ESTADO</div>
                </th>
                <th>
                  <div className={styles.titleDescriTech}>
                    SEGUIMIENTO DE TICKET
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRow[0] ? (
                currentRow.map((e, index) => (
                  <tr key={index}>
                    <td className={styles.cardContainer}>
                      <td scope="row">
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
                            // title="Detalle del Ticktet"
                            // onClick={() => handleSubmit(index)}
                          >
                            <h5>{lowerCaseString(e.name)}</h5>
                            <h5>{lowerCaseString(e.last_name)}</h5>
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
                        <div className={styles.status}>
                          <span>{e.status != "Close" ? "ACTIVO" : ""}</span>
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
              ) : (
                <div className={styles.notFound}>
                  <h3>NO HAY TICKET</h3>
                </div>
              )}
            </tbody>
            <div className={styles.containerPagination}></div>
            {tickets.length > 5 ? (
              <div>
                <div className={styles.page}>
                  Pagina {currentPage} de{" "}
                  {Math.ceil(tickets.length / rowPerPage)}
                </div>
                <div>
                  <PaginationCard
                    rowPerPage={rowPerPage}
                    allRow={tickets.length}
                    paginado={paginado}
                    m={currentPage}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
