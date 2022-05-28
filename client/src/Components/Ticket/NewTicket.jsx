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

  console.log(user)
  const [errors, setErrors] = useState({
    description: "",
    classification: "",
  });
  const [data, setData] = useState({
  
    description: "",
    classification: "",
    
  });

  const handleChange = ({ target: { name, value } }) => {
    setData((old) => ({ ...old, [name]: value }));
    setErrors({
      
        description: "",
        classification: "",
       
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {description, classification, } = validateNewTicket(data);
    if (  description || classification )
      setErrors((old) => ({
        ...old,
        description: description ? description : "",
        classification: classification ? classification : "",       
      }));
    else {
      var conf = window.confirm("Do you want to create the ticket?");

      if (conf) {

        let ticket ={
          name: user.name,
          email:user.email,
          business:user.business,
          departament: user.departament,
          description:data.description,
          classification:data.classification
        }
        
        const error = await dispatch(newTicket(ticket));
        if (error) {
          alert(error.data.msg);
        } else {
          alert("User create successfully");
        }
      } else {
        alert("The user is not created!");
      }
      isTicket()
      setData({
     
        description: "",
        classification: "",
       
      });
 
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
          />
        </div>
        {errors.description ? (
          <span className={style.errorSpan}>{errors.description}</span>
        ) : (
          ""
        )}
      </label>
      <label className={style.wrapper}>
        <h5>Classification</h5>
        <div
          className={`${style.inputGroup} ${errors.classification ? style.error : ""} `}
        >
          <input
            value={data.classification}
            onChange={handleChange}
            name="classification"
            type="text"
            placeholder="Classification..."
            autoComplete="off"
          />
        </div>
        {errors.classification ? (
          <span className={style.errorSpan}>{errors.classification}</span>
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
