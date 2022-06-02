import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaEye } from "react-icons/fa";

import { allTickets, newTicket } from "../../Redux/Actions/Ticket";
import { validateNewTicket } from "../../Utils/validateTicket";



import style from "./NewTicket.module.css";


export default function NewTicket({ isTicket}) {
  const dispatch = useDispatch();
  const user = useSelector((state) =>  state.auth.user)

 
  const [errors, setErrors] = useState({
    description: "",

  });
  const [data, setData] = useState({
  
    description: "",

    
  });

  const handleChange = ({ target: { name, value } }) => {
    setData((old) => ({ ...old, [name]: value }));
    setErrors({
      
        description: "",
     
       
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {description} = validateNewTicket(data);
    if (  description )
      setErrors((old) => ({
        ...old,
        description: description ? description : "",
           
      }));
    else {
      var conf = window.confirm("Esta seguro que quiere crear el ticket?");

      if (conf) {

        let ticket ={
          name: user.name,
          email:user.email,
          business:user.business,
          departament: user.departament,
          description:data.description,
         
        }
        
        const error = await dispatch(newTicket(ticket));
        if (error) {
          alert(error.data.msg);
        } else {
          alert("Ticket creado con éxitos!");
          isTicket()
        }
      } else {
        alert("El ticket no se creo!");
        isTicket()
      }
  
    }
  };

  return (
    <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
      <div className={style.title}>
        <h1>New Ticket</h1>
      </div>
      <label className={style.wrapper}>
        <h5>Name</h5>
        <div
          className={`${style.inputGroup} ${errors.name ? style.error : ""} `}
        >
          {user.name}
        </div>
      </label>


      <label className={style.wrapper}>
        <h5>Business</h5>
        <div
          className={`${style.inputGroup} ${errors.email ? style.error : ""} `}
        >
         {user.business}
        </div>
 
      </label>
      <label className={style.wrapper}>
        <h5>Departament</h5>
        <div
          className={`${style.inputGroup} ${errors.email ? style.error : ""} `}
        >
         {user.departament}
        </div>
 
      </label>

      <label className={style.wrapper}>
        <h5>Description</h5>
        <div
          className={`${style.inputGroup} ${errors.description ? style.error : ""} `}
        >
          <textarea
            value={data.description}
            onChange={handleChange}
            name="description"
            type="text"
            placeholder="Description..."
            autoComplete="off"
            rows={5}
            cols={40}
            maxLength={200}
          />
        </div>
        {errors.description ? (
          <span className={style.errorSpan}>{errors.description}</span>
        ) : (
          <span className={style.chart}>
          {200 - data.description.length} Caracteres disponibles
        </span>
        )}
      </label>

  
      <button className={style.submit} type="submit">
        Create
      </button>
    </form>
  );
}
