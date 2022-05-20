import axios from "axios";
import { ALL_TICKETS, NEW_TICKET, URL_ALLTICKETS, URL_NEWTICKET } from "./ActionsTypes";

export function newTicket(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_NEWTICKET, data);
      dispatch({ type: NEW_TICKET, payload: response });
    } catch (e){
      console.log(e.response.data)
      return e.response.status
    }
};
}

export function allTickets() {
    return async (dispatch) => {
      try {
        const response = await axios.get(URL_ALLTICKETS);
        dispatch({ type: ALL_TICKETS, payload: response });
      } catch (e){
        console.log(e.response.data)
        return e.response.status
      }
  };
  }

