import axios from "axios";
import { EDIT_TICKET_ADMIN, FILTER_TICKET_ADMIN, LOGIN_ADMIN, LOGOUT, URL_EDIT_TICKET_ADMIN, URL_FILTER_TICKET_ADMIN, URL_LOGIN_ADMIN } from "./ActionsTypes";

export function adminLogin(admin) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_LOGIN_ADMIN, admin);
      dispatch({ type: LOGIN_ADMIN, payload: response });
    } catch (e){
      console.log(e.response.data)
      return e.response.status
    }
};
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: {},
    });
  };
}


export function editTicketAdmin(id,data){
  return async (dispatch)=>{
    try{
      const response = await axios.put(`${URL_EDIT_TICKET_ADMIN}/${id}`,data)
      dispatch({type:EDIT_TICKET_ADMIN, payload:{}})
    }catch (e){
      console.log(e.response.data)
      return e.response.data
    }
  }
}

export function filterTicketAdmin (status){
  try{

    return async (dispatch)=>{
      const response = await axios.get(`${URL_FILTER_TICKET_ADMIN}/${status}`)
      dispatch({type: FILTER_TICKET_ADMIN, payload: response}) 
    }
  }catch(e){
    console.log(e.response.data)
    return e.response.data
  }
}