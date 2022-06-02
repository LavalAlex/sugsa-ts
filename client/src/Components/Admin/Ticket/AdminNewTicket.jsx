import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaEye } from "react-icons/fa";

import { allTickets, newTicket } from "../../../Redux/Actions/Ticket";
import { validateNewTicket } from "../../../Utils/validateTicket";

import { adminNewTicket, allUsers } from "../../../Redux/Actions/Admin";

import style from "./AdminNewTicket.module.css";
import { optionSelectUser } from "../../../Utils/optionUser";


export default function AdminNewTicket({ isTicket}) {
  const dispatch = useDispatch();
  const user = useSelector((state) =>  state.auth.user)
  const users = useSelector((state) => state.users.users)

  const [errors, setErrors] = useState({
    description: "",
    classification: "",
  });
  const [data, setData] = useState({
    description: "",
    classification: "",
    
  });

  const [userSearch, setUserSearch] = useState({})
  const [optionUser, setOptionUser] = useState([]);


  useEffect(()=>{
    dispatch(allUsers())
  },[])

  useEffect(() => {
    if (users[0]) {
      setOptionUser(optionSelectUser(users));
    } else {
      dispatch(allUsers())
      setOptionUser([]);
    }
  }, [users]);

  const handleChange = ({ target: { name, value } }) => {
    setData((old) => ({ ...old, [name]: value }));
    setErrors({
      
        description: "",      
       
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {description} = validateNewTicket(data);
    if (  description  )
      setErrors((old) => ({
        ...old,
        description: description ? description : "",
              
      }));
    else {
      var conf = window.confirm("Do you want to create the ticket?");

      if (conf) {

        let ticket ={
          name: userSearch.name,
          email:userSearch.email,
          business:userSearch.business,
          departament: userSearch.departament,
          description:data.description,
        }
        
        const error = await dispatch(adminNewTicket(ticket));
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
     
       
      });
 
    }
  };

  const handleSelectUser = ({id})=>{
    setUserSearch(users[id])
  }

  return (
    <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
      <div className={style.title}>
        <h1>New Ticket</h1>
      </div>
      
      <label>
          <h5>User</h5>
          <label className={style.wrapper}>
            <Select
              className={`${style.wrapper} ${
                errors.user ? style.errorSelect : ""
              }`}
              onChange={(e) => handleSelectUser(e)}
              options={optionUser}
              placeholder="User..."
            />
          </label>
        </label>
        <div>
          {errors.business ? (
            <span className={style.errorSpan}>{errors.business}</span>
          ) : (
            ""
          )}
        </div>


      <label className={style.wrapper}>
        <h5>Email</h5>
        <div
          className={`${style.inputGroup} ${errors.name ? style.error : ""} `}
        >
          {userSearch.email}
        </div>
      </label>


      <label className={style.wrapper}>
        <h5>Business</h5>
        <div
          className={`${style.inputGroup} ${errors.email ? style.error : ""} `}
        >
         {userSearch.business}
        </div>
 
      </label>
      <label className={style.wrapper}>
        <h5>Departament</h5>
        <div
          className={`${style.inputGroup} ${errors.email ? style.error : ""} `}
        >
         {userSearch.departament}
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
            cols={400}
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
        Create Ticket
      </button>
    </form>
  );
}
