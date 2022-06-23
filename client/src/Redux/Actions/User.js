import axios from "axios";
import {
  DELETE_DEPARTAMENT_USER,
  DELETE_USER,
  UPDATE_USER,
  URL_DELETE_DEPARTAMENT_USER,
  URL_DELETE_USER,
  URL_UPDATE_USER,
} from "./ActionsTypes";

export function deleteUser(data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(URL_DELETE_USER, data);
      dispatch({ type: DELETE_USER, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function deleteDepartamentUser(data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(URL_DELETE_DEPARTAMENT_USER, data);
      dispatch({ type: DELETE_DEPARTAMENT_USER, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function updateUser(data){
  return async (dispatch) => {
    try {
      const response = await axios.put(URL_UPDATE_USER, data);
      dispatch({ type: UPDATE_USER, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}