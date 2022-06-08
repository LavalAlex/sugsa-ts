import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editTicketAdmin } from "../../Redux/Actions/Admin";
import style from "./FeedbackCard.module.css";

export default function FeedbackCard({ id }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ feedback: "" });
  const [errors, setErrors] = useState({ feedback: "" });
  const navigate = useNavigate()

  const handleInput = ({ target: { name, value } }) => {
    setInput((old) => ({
      ...old,
      [name]: value,
    }));
    setErrors((old) => ({
        ...old,
        feedback: "",
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.feedback) {
      setErrors((old) => ({
        feedback: "Error, You must provider a options",
      }));
    } else {
      const error = await dispatch(editTicketAdmin(id, input));
      //   var conf = window.confirm("Do you want to submit the poll?");
      alert("Gracias por su feedback, es muy importante para nosotros!");
      navigate('/login')
    }
  };

  return (
    <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
      <div className={style.title}>
        <h1>FEEDBACK TICKET</h1>
      </div>
      <label className={style.wrapper}>
        <h2>Ticket Número:</h2>
        <div className={`${style.inputGroup}  `}>
          <div> {id}</div>
        </div>
      </label>

      <label className={style.wrapper}>
        <h2>Como calificarias el trabajo?</h2>
        <div>
          <input
            type="radio"
            name="feedback"
            value="perfecto"
            onChange={handleInput}
          />
          <label>Perfect, gracias!</label>
        </div>

        <div>
          <input
            type="radio"
            name="feedback"
            value="bueno"
            onChange={handleInput}
          />
          <label>Bueno, se podria mejorar!</label>
        </div>

        <div>
          <input
            type="radio"
            name="feedback"
            value="malo"
            onChange={handleInput}
          />
          <label>Malo</label>
        </div>
        {errors.feedback ? (
          <span className={style.errorSpan}>{errors.feedback}</span>
        ) : (
          ""
        )}
      </label>

      <button className={style.submit} type="submit">
        Create
      </button>
    </form>
  );
}
