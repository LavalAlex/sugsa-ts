import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTicket } from "../../Redux/Actions/Ticket";
import { utilDate } from "../../Utils/tableUtils";
import { validateInputFeedback } from "../../Utils/validateTicket";

import style from "./TicketDetails.module.css";

export default function TicketDetails({ data, isTicket }) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    feedback: "",
  });
  const [input, setInput] = useState({
    feedback: "",
  });


  const handleChange = ({ target: { name, value } }) => {
    setInput((old) => ({ ...old, [name]: value }));
    setErrors({
      feedback: "",
    });
  };

  const handleCancel = () => {
    var conf = window.confirm("Seguro que quieres cancelar el ticket?");
    if (conf) {
      const update = {
        status: "Cancel",
        feedback:"Cancelado por el Usuario"
      }
      dispatch(editTicket(data._id,  update ));
      alert("Ticket cancelado con éxito!");
    }
    isTicket();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { feedback } = validateInputFeedback(input);
    if (feedback)
      setErrors((old) => ({
        ...old,
        feedback: feedback,
      }));
    else {
      var conf = window.confirm("Do you want to send the feedback?");
      if (conf) {
        let ticket = {
          status: "Close",
          feedback: input.feedback,
        };
        dispatch(editTicket(data._id, ticket));
        alert("Feedback sent successfully");
      }
    }
    isTicket();
  };
 
  return (
    <div className={style.container} key={data.id}>
      <div className={style.title}>
        <h1>Ticket</h1>
      </div>
      <div className={style.data}>
        <h4>Name:</h4>
        <div>{data.name}</div>
        <h4>Date:</h4>
        <div>{utilDate(data.createdAt)}</div>
        <h4>Description:</h4>
        <div>{data.description}</div>
      </div>
      
      {data.feedback == "false" ? (
        <div>
          <div className={style.data}>
            <h4>Classification:</h4>
            <div>{data.classification}</div>
            <h4>Assigned Technician:</h4>
            <div>
              {!data.assigned_technician || data.assigned_technician == "false"
                ? "Unassigned at the moment"
                : data.assigned_technician}
            </div>
          </div>
          <div className={style.buttonContainer}>
            <button type="submit" onClick={handleCancel}>
              Cancel Ticket
            </button>
          </div>
        </div>
      ) : (
        <div className={style.data}>
          <h4>Feedback</h4>
          <div
            className={`${style.inputGroup} ${
              errors.feedback ? style.error : ""
            } `}
          >
            <textarea
              value={input.feedback}
              onChange={handleChange}
              name="feedback"
              type="text"
              placeholder="Feedback..."
              autoComplete="off"
              // rows={5}
              cols={40}
            />
          </div>
          {errors.feedback ? (
            <span className={style.errorSpan}>{errors.feedback}</span>
          ) : (
            ""
          )}

          <button className={style.submit} onClick={handleSubmit}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}
