import axios from "axios";
import {
  ADD_DEPARTAMENT_BUSINESS,
  ALL_BUSINESS,
  ALL_USERS_BUSINESS,
  CREATE_BUSINESS,
  DELETE_DEPARTAMENT_BUSINESS,
  DELETE_TECHNICAL_BUSINESS,
  DEPARTAMENT_BUSINESS,
  TECHNICALS_BUSINESS,
  TECHNICAL_ASSIGNED_BUSINESS,
  URL_ADD_DEPARTAMENT_BUSINESS,
  URL_ALL_BUSINESS,
  URL_ALL_USERS_BUSINESS,
  URL_CREATE_BUSINESS,
  URL_DELETE_DEPARTAMENT_BUSINESS,
  URL_DELETE_TECHNICAL_BUSINESS,
  URL_DEPARTAMENT_BUSINESS,
  URL_TECHNICALS_BUSINESS,
  URL_TECHNICAL_ASSIGNED_BUSINESS,
} from "./ActionsTypes";

export function allBusiness() {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_ALL_BUSINESS);
      dispatch({ type: ALL_BUSINESS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function departamentBusiness(name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_DEPARTAMENT_BUSINESS, { name });
      dispatch({ type: DEPARTAMENT_BUSINESS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function createBusiness(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_CREATE_BUSINESS, data);
      dispatch({ type: CREATE_BUSINESS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function deleteDepartamentBusiness(data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(URL_DELETE_DEPARTAMENT_BUSINESS, data);
      dispatch({ type: DELETE_DEPARTAMENT_BUSINESS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function technicalsBusiness(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_TECHNICALS_BUSINESS}/${id}`);
      dispatch({ type: TECHNICALS_BUSINESS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function technicalAssignedBusiness(data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(URL_TECHNICAL_ASSIGNED_BUSINESS, data);
      dispatch({ type: TECHNICAL_ASSIGNED_BUSINESS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function deleteTechnicalBusiness(data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(URL_DELETE_TECHNICAL_BUSINESS, data);
      dispatch({ type: DELETE_TECHNICAL_BUSINESS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function allUsersBusiness(name){
  return async (dispatch) => {
    try{
      const response = await axios.get(`${URL_ALL_USERS_BUSINESS}/${name}`)
      dispatch({type: ALL_USERS_BUSINESS, payload: response})
    }catch(e){
      console.log(e.response.data);
      return e.response.data;
    }
  }
}

export function addDepartamentBusiness(data){
  return async (dispatch) => {
    try{
      const response = await axios.put(URL_ADD_DEPARTAMENT_BUSINESS, data)
      dispatch({type: ADD_DEPARTAMENT_BUSINESS, payload: response})
    }catch(e){
      console.log(e.response.data);
      return e.response.data;
    }
  }
}