import axios from "axios";
import {
  ALL_TICKETS,
  EDIT_TICKET,
  NEW_TICKET,
  ORDER_TICKETS,
  TICKET_ID,
  URL_ALLTICKETS,
  URL_EDIT_TICKET,
  URL_NEWTICKET,
} from "./ActionsTypes";

export function newTicket(data) {
    return async (dispatch) => {
    try {
      const response = await axios.post(URL_NEWTICKET, data);
      dispatch({ type: NEW_TICKET, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function allTickets(email) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_ALLTICKETS, { email });
      dispatch({ type: ALL_TICKETS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function editTicket(id, data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_EDIT_TICKET}/${id}`, data);
      dispatch({ type: EDIT_TICKET, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}


export function orderTicket(payload){
  return (dispatch)=>{
    dispatch({type:ORDER_TICKETS, payload})
  }
}

export function searchTicket(payload){
  return (dispatch)=>{
    dispatch({type: TICKET_ID, payload})
  }
}