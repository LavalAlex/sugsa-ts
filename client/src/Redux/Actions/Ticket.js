import axios from "axios";
import {
  ALL_TICKETS,
  EDIT_TICKET,
  FEEDBACK_TICKET,
  NEW_TICKET,
  ORDER_TICKETS,
  TICKET_ID,
  URL_ALLTICKETS,
  URL_EDIT_TICKET,
  URL_FEEDBACK_TICKET,
  URL_NEWTICKET,
} from "./ActionsTypes";

export function newTicket({ ticket, user: { token } }) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_NEWTICKET, ticket, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data; boundary=${ticket._boundary}`,
        },
      });
      dispatch({ type: NEW_TICKET, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function allTickets({ email, token }) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        URL_ALLTICKETS,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({ type: ALL_TICKETS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function editTicket(id, data, token) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_EDIT_TICKET}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: EDIT_TICKET, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function orderTicket(payload) {
  return (dispatch) => {
    dispatch({ type: ORDER_TICKETS, payload });
  };
}

export function searchTicket(payload) {
  return (dispatch) => {
    dispatch({ type: TICKET_ID, payload });
  };
}

export function feedbackTicket(id, data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_FEEDBACK_TICKET}/${id}`, data);
      dispatch({ type: FEEDBACK_TICKET, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}
