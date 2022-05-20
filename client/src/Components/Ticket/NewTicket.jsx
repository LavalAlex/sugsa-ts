import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaEye } from "react-icons/fa";

import { allTickets, newTicket } from "../../Redux/Actions/Ticket";
import { validateNewTicket } from "../../Utils/validate";



import style from "./NewTicket.module.css";


export default function NewTicket({ isTicket}) {
  const dispatch = useDispatch();
  const user = useSelector((state) =>  state.auth)

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    classification: "",
    business:""
  });
  const [data, setData] = useState({
    name: "",
    email: user.email,
    description: "",
    classification: "",
    business:""
  });

  const handleChange = ({ target: { name, value } }) => {
    setData((old) => ({ ...old, [name]: value }));
    setErrors({
        name: "",
        description: "",
        classification: "",
        business:""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name,  description, classification, business } = validateNewTicket(data);
    if (name ||  description || classification, business )
      setErrors((old) => ({
        ...old,
        name: name ? name : "",
        description: description ? description : "",
        classification: classification ? classification : "",
        business: business? business:""
        
      }));
    else {
      var conf = window.confirm("Do you want to create the user?");

      if (conf) {
        
        const error = await dispatch(newTicket(data));
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
        name: "",
        description: "",
        classification: "",
        business:""
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
          <input
            value={data.name}
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name user..."
            autoComplete="off"
          />
        </div>
        {errors.name ? (
          <span className={style.errorSpan}>{errors.name}</span>
        ) : (
          ""
        )}
      </label>
{/* 
      <label className={style.wrapper}>
        <h5>Email</h5>
        <div
          className={`${style.inputGroup} ${errors.email ? style.error : ""} `}
        >
          <input
            value={data.email}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email..."
            autoComplete="off"
          />
        </div>
        {errors.email ? (
          <span className={style.errorSpan}>{errors.email}</span>
        ) : (
          ""
        )}
      </label> */}

      <label className={style.wrapper}>
        <h5>Business</h5>
        <div
          className={`${style.inputGroup} ${errors.email ? style.error : ""} `}
        >
          <input
            value={data.business}
            onChange={handleChange}
            name="business"
            type="text"
            placeholder="Business..."
            autoComplete="off"
          />
        </div>
        {errors.email ? (
          <span className={style.errorSpan}>{errors.email}</span>
        ) : (
          ""
        )}
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
