import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

import { BiCommentAdd, BiAddToQueue } from "react-icons/bi";
import styles from "./Tables.module.css";
import { avatarUser, utilDate } from "../../Utils/tableUtils";
import { useDispatch } from "react-redux";
import { RiAlignJustify } from "react-icons/ri";

export default function Tables({
  tickets,
  setTicketId,
  setDetailTicket,
  isTicket,
  setFollowTicket,
}) {
  const dispatch = useDispatch();

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
                          <div className={styles.cardBody}>
                            <h5>{e.id}</h5>
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
                              // onClick={() => handleSubmit(index)}
                              // title="Details Ticket"
                            >
                              <h5>{e.name}</h5>
                              <span>{e.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className={styles.status}>
                            <span>{e.status}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.status}>
                            <span>{e.classification}</span>
                          </div>
                        </td>

                        <td>
                          <div className={styles.date}>
                            <span>{utilDate(e.createdAt)}</span>
                          </div>
                        </td>

                        <td>
                          <div
                            onClick={() => handleFollowing(index)}
                            title="Seguimiento"
                            className={styles.btn}
                          >
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
