import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaKey, FaEye } from "react-icons/fa";

import { signup } from "../../../../Redux/Actions/Auth";
import { validateSignup } from "../../../../Utils/validate";

import style from "./User.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  allBusiness,
  allUsersBusiness,
  departamentBusiness,
} from "../../../../Redux/Actions/Business";
import {
  optionSelect,
  selectDepartament,
} from "../../../../Utils/optionBusiness";
import { allDepartament } from "../../../../Redux/Actions/Departament";
import { createUserAdmin } from "../../../../Redux/Actions/Admin";

import { optionSelectUser } from "../../../../Utils/optionUser";
import { TiDeleteOutline } from "react-icons/ti";
import { BiEditAlt } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import {
  deleteDepartamentUser,
  deleteUser,
  updateUser,
} from "../../../../Redux/Actions/User";
export default function UserEdit({ setSelectLink }) {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const navitage = useNavigate();
  const [keyOn, setKeyOn] = useState(false);
  const [optionBusiness, setOptionBusines] = useState([]);
  const business = useSelector((state) => state.business.business);
  const departament = useSelector((state) => state.departament.departament);
  const [optionUser, setOptionUser] = useState([]);

  const users = useSelector((state) => state.business.users);
  // const allDepartaments = useSelector((state) => state.departament.departament);

  const [submit, setSubmit] = useState(0)
  const [errors, setErrors] = useState({
    name: "",
    last_name: "",
    email: "",

    business: "",
    departament: "",
    code: "",
  });

  const [input, setInput] = useState({
    name: "",
    last_name: "",
    email: "",
    business: "",
    departament: "",
    userBusiness: "",
  });

  const [inputEdit, setInputEdit] = useState({
    name: "",
    last_name: "",
    departament: "",
  });

  const [inputOn, setInputOn] = useState({
    name: false,
    last_name: false,
    departament: "",
  });

  useEffect(() => {
    dispatch(allBusiness());
    dispatch(allDepartament());
  }, [input.business]);

  useEffect(() => {
    if (business[0]) {
      setOptionBusines(optionSelect(business));
    } else {
      dispatch(allBusiness());
      setOptionBusines([]);
    }
    if (users[0]) {
      setOptionUser(optionSelectUser(users));
    } else {
      setOptionUser([]);
    }
  }, [input.business, users]);

  const handleChange = (e) => {
    setInputEdit({
      ...inputEdit,
      [e.target.name]: e.target.value,
    });
    setErrors("");
  };

  const handleOn = ({ name }) => {
    setInputOn({
      ...inputOn,
      [name]: !inputOn[name],
    });
  };
  // console.log(inputOn);

  const handleSubmit = async (e) => {
    setSubmit((old) => old+1)
    if(submit <1){

      e.preventDefault();
      // const { inputEdit.name, email,  business, departament, last_name } =
      // validateSignup(input);
      if (!inputEdit.name && !inputEdit.last_name) {
      setErrors((old) => ({
        ...old,
        code:"Debe proporcionar un nombre o un apellido!"
      }));
    } else {
      var conf = window.confirm("Esta seguro que quiere guardar cambios a este usuario?");
      if(conf){
        const data = {
          email: input.email,
          name: inputEdit.name,
          last_name: inputEdit.last_name
        }
        const code = await dispatch(updateUser(data));
        if (!code) {
          alert('Usuario actualizado con éxito!')
          setSelectLink({businessAdd:"businessAdd"})
        } else {
          setErrors((old) => ({
            ...old,
            code: code.error,
          }));
        }
      }else{
        alert("Usuario NO SE ACTUALIZO!")
      }
    }
  }else{
    alert("Datos enviados, aguarde un segundo!")
  }
  };
  
  const handleSelectBusiness = async (e) => {
    setInput((old) => ({ ...old, business: e.value.name }));

    await dispatch(allUsersBusiness(e.value.name));
    setInput({
      name: "",
      last_name: "",
      email: "",
      business: "",
      departament: "",
      userBusiness: "",
    });
    setOptionUser([{name: "", last_name:""}]);
    // setOptionBusines([]);
  };

  const handleSelectUser = async (e) => {
    // setInput((old) => ({ ...old, departament: e.map((option) => option.value.name) }));
    // setErrors({
    //   name: "",
    //   last_name: "",
    //   email: "",
    //   password: "",
    //   business: "",
    //   departament: "",
    // });

    setInput((old) => ({
      ...old,
      name: users[e.id].name,
      last_name: users[e.id].last_name,
      email: users[e.id].email,
      departament: users[e.id].departament,
      userBusiness: users[e.id].business,
    }));
  

  };

  // console.log(inputEdit);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    console.log(input.email);
    const code = await dispatch(deleteUser({ email: input.email }));
    console.log(code);
    await dispatch(allBusiness());
    await dispatch(allDepartament());
    setInput({
      name: "",
      last_name: "",
      email: "",
      business: "",
      departament: "",
      userBusiness: "",
    });
    setOptionUser([]);
    setOptionBusines([]);
  };

  const handleDeleteDepartament = async (e) => {
    const data = { departament: e, email: input.email };

    console.log(input.email);
    const code = await dispatch(deleteDepartamentUser(data));
    console.log(code);
    await dispatch(allBusiness());
    await dispatch(allDepartament());
    setInput({
      name: "",
      last_name: "",
      email: "",
      business: "",
      departament: "",
      userBusiness: "",
    });
    setOptionUser([]);
    setOptionBusines([]);
  };
  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>- EDITAR USUARIO -</h1>
        <label>
          <h5>Empresa:</h5>
          <label className={style.wrapper}>
            <Select
              className={`${style.wrapper} ${
                errors.business ? style.errorSelect : ""
              }`}
              onChange={(e) => handleSelectBusiness(e)}
              options={optionBusiness}
              name="business"
              placeholder="Empresa..."
            />
          </label>
        </label>
        <label>
          <h5>Usuario:</h5>
          <label className={style.wrapper}>
            <Select
              className={`${style.wrapper} ${
                errors.departament ? style.errorSelect : ""
              }`}
              onChange={(e) => handleSelectUser(e)}
              options={optionUser}
              placeholder="Usuario..."
              name="user"
            />
          </label>
        </label>
        {input.name ? (
          <div>
            <label>
              <h5>Nombre:</h5>
              <div
                className={`${style.inputGroup} ${
                  errors.name ? style.error : ""
                } `}
              >
                <FaUserCircle />
                {inputOn.name ? (
                  <input
                    pattern="[a-zA-Z]+"
                    type="text"
                    value={inputEdit.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Nombre..."
                    autoComplete="off"
                  />
                ) : (
                  <input value={input.name} />
                )}
                <BiEditAlt
                  className={style.icon}
                  onClick={() => handleOn({ name: "name" })}
                />
              </div>
            </label>
            <div>
              {errors.name ? (
                <span className={style.errorSpan}>{errors.name}</span>
              ) : (
                ""
              )}
            </div>
            <label>
              <h5>Apellido:</h5>
              <div
                className={`${style.inputGroup} ${
                  errors.last_name ? style.error : ""
                } `}
              >
                <FaUserCircle />
                {inputOn.last_name ? (
                  <input
                    pattern="[a-zA-Z]+"
                    type="text"
                    value={inputEdit.last_name}
                    name="last_name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Apellido..."
                    autoComplete="off"
                  />
                ) : (
                  <input value={input.last_name} />
                )}
                <BiEditAlt
                  className={style.icon}
                  onClick={() => handleOn({ name: "last_name" })}
                />
              </div>
            </label>
            <div>
              {errors.last_name ? (
                <span className={style.errorSpan}>{errors.last_name}</span>
              ) : (
                ""
              )}
            </div>

            <label>
              <h5>Email:</h5>
              <div
                className={`${style.inputGroup} ${
                  errors.email ? style.error : ""
                } `}
              >
                <MdAlternateEmail />

                <input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  placeholder="Email..."
                  autoComplete="off"
                />
              </div>
            </label>
            <div>
              {errors.email ? (
                <span className={style.errorSpan}>{errors.email}</span>
              ) : (
                ""
              )}
            </div>
            <label>
              <h5>Empresa:</h5>
              {input.userBusiness[0] ? (
                input.userBusiness.map((e, i) => {
                  return (
                    <div key={i} className={style.inputGroup}>
                      <input value={e.toUpperCase()} business="business" />
                      <TiDeleteOutline
                        className={style.iconDelete}
                        title="Eliminar Empresa"
                        // onClick={() => handleDeleteDepartament(e)}
                      />
                    </div>
                  );
                })
              ) : (
                <div>Este Usuario no pertenece a ninguna empresa</div>
              )}
            </label>
            <label>
              <h5>Departamentos:</h5>
              {input.departament[0] ? (
                input.departament.map((e, i) => {
                  return (
                    <div key={i} className={style.inputGroup}>
                      <input value={e.toUpperCase()} business="business" />
                      <TiDeleteOutline
                        className={style.iconDelete}
                        title="Eliminar Departamento"
                        onClick={() => handleDeleteDepartament(e)}
                      />
                    </div>
                  );
                })
              ) : (
                <div>Este Usuario no pertenece a ningun departamento</div>
              )}
            </label>
            <div>
              {errors.departament ? (
                <span className={style.errorSpan}>{errors.departament}</span>
              ) : (
                ""
              )}
            </div>
            <div>
              {errors.code ? (
                <span className={style.errorSpan}>{errors.code}</span>
              ) : (
                ""
              )}
            </div>
            <div className={style.buttonContainer}>
              <button type="submit" >GUARDAR</button>
            </div>
            <div className={style.buttonContainerDelete}>
              <button
                type="submit"
                title="Dar de baja usuario"
                onClick={(e) => handleDeleteUser(e)}
              >
                DAR DE BAJA
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
