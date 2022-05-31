import axios from "axios";
import {
  ALL_TECHNICALS,
  ALL_TICKETS_ADMIN,
  ALL_USERS,
  CREATE_TICKET_ADMIN,
  DELETE_TICKET_ADMIN,
  EDIT_TICKET_ADMIN,
  FILTER_TICKET_ADMIN,
  LOGIN_ADMIN,
  LOGOUT,
  URL_ALLTICKETS_ADMIN,
  URL_ALL_TECHNICALS,
  URL_ALL_USERS,
  URL_CREATE_TICKET_ADMIN,
  URL_DELETE_TICKET_ADMIN,
  URL_EDIT_TICKET_ADMIN,
  URL_FILTER_TICKET_ADMIN,
  URL_LOGIN_ADMIN,
} from "./ActionsTypes";

export function adminLogin(admin) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_LOGIN_ADMIN, admin);
      dispatch({ type: LOGIN_ADMIN, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.status;
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

export function editTicketAdmin(id, data) {
  return async (dispatch) => {
    try {
      console.log(data)
      const response = await axios.put(`${URL_EDIT_TICKET_ADMIN}/${id}`, data);
      dispatch({ type: EDIT_TICKET_ADMIN, payload: {} });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function allTicketsAdmin() {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_ALLTICKETS_ADMIN);
      dispatch({ type: ALL_TICKETS_ADMIN, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function filterTicketAdmin(status) {
  try {
    return async (dispatch) => {
      const response = await axios.get(`${URL_FILTER_TICKET_ADMIN}/${status}`);
      dispatch({ type: FILTER_TICKET_ADMIN, payload: response });
    };
  } catch (e) {
    console.log(e.response.data);
    return e.response.data;
  }
}

export function deleteTicketAdmin(id) {
  try {
    return async (dispatch) => {
      const response = await axios.delete(`${URL_DELETE_TICKET_ADMIN}/${id}`);
      dispatch({ type: DELETE_TICKET_ADMIN, payload: response });
    };
  } catch (e) {
    console.log(e.response.data);
    return e.response.data;
  }
}


export function allTechnicals() {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_ALL_TECHNICALS);
      dispatch({ type: ALL_TECHNICALS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.status;
    }
  };
}

export function allUsers(){
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_ALL_USERS);
      dispatch({ type: ALL_USERS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.status;
    }
  };
}

export function adminNewTicket(data) {
  return async (dispatch) => {
  try {
    const response = await axios.post(URL_CREATE_TICKET_ADMIN, data);
    dispatch({ type: CREATE_TICKET_ADMIN, payload: response });
  } catch (e) {
    console.log(e.response.data);
    return e.response.status;
  }
};
}