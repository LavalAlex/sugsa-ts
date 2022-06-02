import axios from "axios";
import { ALL_BUSINESS, DEPARTAMENT_BUSINESS, URL_ALL_BUSINESS, URL_DEPARTAMENT_BUSINESS } from "./ActionsTypes";

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

export function departamentBusiness(name){
  return async (dispatch) => {
    
    try {
      const response = await axios.post(URL_DEPARTAMENT_BUSINESS, {name});
      dispatch({ type: DEPARTAMENT_BUSINESS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}