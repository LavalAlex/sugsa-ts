import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

import { BiCommentAdd, BiAddToQueue } from "react-icons/bi";
import styles from "./Tables.module.css";
import {avatarUser, utilDate }from "../../Utils/tableUtils";
import { useDispatch } from "react-redux";
import { allTickets } from "../../Redux/Actions/Ticket";


export default function Tables({tickets, setTicketId, setDetailTicket, isTicket}) {
  const dispatch = useDispatch()  

  const handleSubmit = (id)=>{
    setTicketId(id)
    setDetailTicket(true)
  }

  const handleNewTicket = ()=>{
    
    isTicket()

  }
  const user = 'user'+Math.floor(Math.random()*10)
  return (
    <div className={styles.container}>
      <Card>
        <CardBody>
          <CardTitle>
            <div className={styles.title}>
              <h3>TIKETS</h3>
              <div title="New Ticket" className={styles.btn} onClick={handleNewTicket}>
                
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
              {tickets? tickets.map((e, index) => (
                <tr key={index}>
                  <div className={styles.cardContainer}>
                    <td>
                      <div className={styles.cardBody}>
                        <div>
                          <img
                            src={avatarUser()}
                            className={styles.avatar}
                            alt="avatar"
                            width="45"
                            height="45"
                          />
                        </div>

                        <div
                          className={styles.infoUser}
                          onClick={() => handleSubmit(index)}
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
                      <div className={styles.date}><span>
                        {utilDate(e.createdAt)}
                        </span>
                        </div>
                    </td>
                  </div>
                </tr>
              )):
     
              'Not Found'
        
              
              }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
