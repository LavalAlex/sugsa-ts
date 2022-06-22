import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaKey, FaEye } from "react-icons/fa";

// import { validateSignup } from "../../../Utils/validate";
import { validateInput } from "../../../../Utils/validate";

import style from "./TicketConfig.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import { allDepartament } from "../../../../Redux/Actions/Departament";

import {
  optionSelect,
  selectDepartament,
  selectDepartBusiness,
} from "../../../../Utils/optionBusiness";

import { optionSelectTechnical } from "../../../../Utils/optionTechnical";
import {
  allBusiness,
  createBusiness,
  deleteDepartamentBusiness,
  deleteTechnicalBusiness,
  departamentBusiness,
  technicalAssignedBusiness,
  technicalsBusiness,
} from "../../../../Redux/Actions/Business";
import { BiEditAlt } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { allTicektConfig, createTicektConfig } from "../../../../Redux/Actions/Ticket";
import { selectClasification } from "../../../../Utils/optionClasification";

export default function TicketConfig() {
  const dispatch = useDispatch();


  // const [optionDepartament, setoptionDepartament] = useState([]);
  const business = useSelector((state) => state.business.business);

  const tickets = useSelector((state) => state.tickets.ticketConfig?.classification);
  
  const classification =  useSelector((state) => state.tickets.ticketConfig.classification_default);

  const [optionBusiness, setOptionBusines] = useState([]);

  const [optionClas, setOptionClas] = useState([])

  console.log(tickets)

  const [errors, setErrors] = useState({
    business: "",
    departament: "",
    technical: "",
    code: "",
  });

  //   business,
  //   classification,
  //   classification_default,
  const [input, setInput] = useState({
    id: "",
    business: "",
    classification: "",
    classification_default:"",
    clasDelete:""
});

  useEffect( () => {
    dispatch(allBusiness());
    // dispatch(allTicektConfig())
  }, []);

  useEffect( () => {
    if (business[0]) {
      setOptionBusines(optionSelect(business));
    } else {
      dispatch(allBusiness());
      setOptionBusines([]);
    }
    if (tickets) {
        setOptionClas(selectClasification(tickets));
    }else{
      if(input.business)
     dispatch(allTicektConfig(input.business));
    }
  }, [input.business, tickets]);

  //   useEffect(() => {
  //     if (departament[0]) {
  //       setoptionDepartament(selectDepartBusiness(departament, allDepartaments));
  //     } else {
  //       dispatch(allDepartament());
  //     }
  //   }, [input.business, departament[0]]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors("");
  };
  
  console.log(classification)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      business: input.business,
      classification: input.classification,
    };
    const code = await dispatch(createTicektConfig(data))
    alert("Clasificafión creada con exitos!")
    // const { business, departament } = validateInput(input);
    // if (departament || business) {
    //   setErrors((old) => ({
    //     ...old,
    //     business: business ? business : "",
    //     departament: departament ? departament : "",
    //   }));
    // } else {
    //   var conf = window.confirm("Esta seguro que quiere crear la empresa?");
    //   if(conf){
    //     const code = await dispatch(createBusiness(input));
    //     if (!code) {
    //       alert("Empresa creada con éxitos!");
    //       setoptionDepartament([])
    //       setInput((old)=>({...old, departament: "" }));
    //       // navitage('/admin/tool')
    //     } else {
    //       setErrors((old) => ({
    //         ...old,
    //         code: code.error,
    //       }));
    //     }
    //   }else{
    //     alert("La empresa NO se creo!")
    //     // navitage('/admin/tool')
    //   }
    // }
  };
//   console.log(tickets);
  //   console.log(optionTechnical);

  const handleDelete = async (e) => {

    const data = {
        business: input.business,
        clasDelete:e,
    };
    const code = await dispatch(createTicektConfig(data))
    alert("Clasificafión eliminada con exitos!")
    
    // const code = await dispatch(deleteDepartamentBusiness(update));
    // alert("Eliminar");
  };

  const handleSelectDefault = async (e) => {
    setInput((old) => ({
        ...old,
        classification_default: e.value,
        
      }));
  }

  const handleSelectBusiness = async (e) => {
    setInput((old) => ({
      ...old,
      business: e.value.name,
      id: e.value._id,
    }));
    await dispatch(allTicektConfig(e.value.name));

    // setDepartamen(e.value.departament);
    // selectDepartBusiness(departament, e.value.departament);
    // await dispatch(departamentBusiness(e.value.name));
    // await dispatch(technicalsBusiness(e.value._id));
    // setErrors({
    //   business: "",
    //   last_name: "",
    //   email: "",
    //   business: "",
    // });
  };

//   const handleSelectDepartament = async (e) => {
//     setInput((old) => ({
//       ...old,
//       departament: e.map((option) => option.value),
//     }));
//     setErrors({
//       business: "",
//       departament: "",
//     });
//   };

//   const handleSelectTechnical = async (e) => {
//     setInput((old) => ({ ...old, technical: e.value }));
//     setErrors({
//       business: "",
//       departament: "",
//     });
//   };

  const handleSubmitDefault = async (e) => {
    e.preventDefault();

    const data = {
      business: input.business,
      classification_default: input.classification_default,
    };
    const code = await dispatch(createTicektConfig(data))
    console.log(code)

    // await dispatch(technicalAssignedBusiness(data));

    alert("tecnico asignado con exitos!");
  };

  const handleDeleteTechnical = async (e) => {
    // const data = {
    //   idBusiness: input.id,
    //   idTechnical: e._id,
    // };
    // console.log(data)
    // await dispatch(deleteTechnicalBusiness(data))
    alert("Delete succssesfullt");
  };

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>- EMPRESA -</h1>
        <label>
          <h5>Empresa:</h5>
          <label className={style.wrapper}>
            <Select
              className={`${style.wrapper} ${
                errors.departament ? style.errorSelect : ""
              }`}
              onChange={(e) => handleSelectBusiness(e)}
              options={optionBusiness}
              placeholder="Buscar Empresa..."
              dropdownIndicator
            />
          </label>
        </label>

        {input.business != "" ? (
          <div>
            <label>
              <h5>Configuración Ticket:</h5>
              <div
                className={`${style.inputGroup} ${
                  errors.name ? style.error : ""
                } `}
              >
                <input
                  type="text"
                  value={input.classification}
                  name="classification"
                  onChange={(e) => handleChange(e)}
                  placeholder="Clasificación ticket..."
                  autoComplete="off"
                />
              </div>
              <div className={style.buttonContainer}>
                <button type="submit">Agregar</button>
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
              <h5>Tipos de ticket:</h5>
              {tickets ? (
                tickets.map((e, i) => {
                  return (
                    <div key={i} className={style.inputGroup}>
                      <input value={e.toUpperCase()}  />
                      <TiDeleteOutline
                        className={style.icon}
                        title="Eliminar Categoria"
                        onClick={() => handleDelete(e)}
                      />
                    </div>
                  );
                })
              ) : (
                <div className={style.inputGroup}>
                <input value="No hay ticket para esta empresa" />
              </div>
              )}
            </label>

            <label>
              <h5>Agregar tipo de ticket default:</h5>
              <label className={style.wrapper}>
                <Select
                  className={`${style.wrapper} ${
                    errors.departament ? style.errorSelect : ""
                  }`}
                  onChange={(e) => handleSelectDefault(e)}
                  options={optionClas}
                  placeholder="Elegir tipo de ticket..."
                />
              </label>
            </label>
            <div>
              {errors.departament ? (
                <span className={style.errorSpan}>{errors.departament}</span>
              ) : (
                ""
              )}
            </div>
            <div className={style.buttonContainer}>
              <button type="submit" onClick={handleSubmitDefault} >Seleccionar Tipo</button>
            </div>
            {/* <label>
              <h5>Técnicos Disponibles:</h5>
              {tickets? (
                tickets.map((e, i) => {
                  return (
                    <div key={i} className={style.inputGroup}>
                      <input
                        value={`${e.name.toUpperCase()} ${e.last_name.toUpperCase()}`}
                      />
                      <TiDeleteOutline
                        className={style.icon}
                        title="Eliminar Técnico"
                        onClick={() => handleDeleteTechnical(e)}
                      />
                    </div>
                  );
                })
              ) : (
                <div className={style.inputGroup}>
                  <input value="No tiene técnicos asociados" />
                </div>
              )}
            </label> */}
            {/* <div>
              {errors.departament ? (
                <span className={style.errorSpan}>{errors.departament}</span>
              ) : (
                ""
              )}
            </div> */}
            <label>
              <h5>Tipo de ticket default:</h5>
              <div className={style.inputGroup}>
                {classification ? (
                  <input
                    value={classification.toUpperCase()} 
                  />
                ) : (
                  <input value="No hay tipo de ticket asignado" />
                )}
              </div>
            </label>
            {/* <label>
              <h5>Asignar Técnico a la empresa:</h5>
              <label className={style.wrapper}>
                <Select
                  className={`${style.wrapper} ${
                    errors.departament ? style.errorSelect : ""
                  }`}
                  onChange={(e) => handleSelectTechnical(e)}
                  options={optionSelectTechnical(input.technicals)}
                  placeholder="Técnicos..."
                  dropdownIndicator
                />
              </label>
            </label>
            <div className={style.buttonContainer}>
              <button type="submit" onClick={handleSubmitTechnical}>
                Asignar Técnico
              </button>
            </div>
            <div>
              {errors.departament ? (
                <span className={style.errorSpan}>{errors.departament}</span>
              ) : (
                ""
              )}
            </div> */}

            <div>
              {errors.code ? (
                <span className={style.errorSpan}>{errors.code}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
