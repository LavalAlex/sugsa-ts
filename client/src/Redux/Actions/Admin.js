import axios from "axios";
import {
  ALL_TECHNICALS,
  ALL_TICKETS_ADMIN,
  ALL_USERS,
  CREATE_TECHNICAL,
  CREATE_TICKET_ADMIN,
  CREATE_USER_ADMIN,
  DELETE_TICKET_ADMIN,
  EDIT_TICKET_ADMIN,
  FILTER_TICKET_ADMIN,
  LOGIN_ADMIN,
  LOGOUT,
  LOGOUT_ADMIN,
  NEW_PASSWORD_ADMIN,
  URL_ALLTICKETS_ADMIN,
  URL_ALL_TECHNICALS,
  URL_ALL_USERS,
  URL_CREATE_TECHNICAL,
  URL_CREATE_TICKET_ADMIN,
  URL_CREATE_USER_ADMIN,
  URL_DELETE_TICKET_ADMIN,
  URL_EDIT_TICKET_ADMIN,
  URL_FILTER_TICKET_ADMIN,
  URL_LOGIN_ADMIN,
  URL_NEW_PASSWORD_ADMIN,
} from "./ActionsTypes";

export function adminLogin(admin) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_LOGIN_ADMIN, admin);

      dispatch({ type: LOGIN_ADMIN, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function adminLogout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_ADMIN,
      payload: {},
    });
  };
}

export function editTicketAdmin(id, data, token) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_EDIT_TICKET_ADMIN}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: EDIT_TICKET_ADMIN, payload: {} });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function allTicketsAdmin(token) {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_ALLTICKETS_ADMIN, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: ALL_TICKETS_ADMIN, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function filterTicketAdmin(status, token) {
  try {
    return async (dispatch) => {
      const response = await axios.get(`${URL_FILTER_TICKET_ADMIN}/${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: FILTER_TICKET_ADMIN, payload: response });
    };
  } catch (e) {
    console.log(e.response.data);
    return e.response.data;
  }
}

export function deleteTicketAdmin(id, token) {
  try {
    return async (dispatch) => {
      const response = await axios.delete(`${URL_DELETE_TICKET_ADMIN}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: DELETE_TICKET_ADMIN, payload: response });
    };
  } catch (e) {
    console.log(e.response.data);
    return e.response.data;
  }
}

export function allTechnicals(token) {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_ALL_TECHNICALS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: ALL_TECHNICALS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function allUsers(token) {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_ALL_USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: ALL_USERS, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function adminNewTicket(data, token) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_CREATE_TICKET_ADMIN, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: CREATE_TICKET_ADMIN, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function newPasswordAdmin(data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(URL_NEW_PASSWORD_ADMIN, data);
      dispatch({ type: NEW_PASSWORD_ADMIN, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function createTechnical(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_CREATE_TECHNICAL, data);
      dispatch({ type: CREATE_TECHNICAL, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}

export function createUserAdmin(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_CREATE_USER_ADMIN, data);
      dispatch({ type: CREATE_USER_ADMIN, payload: response });
    } catch (e) {
      console.log(e.response.data);
      return e.response.data;
    }
  };
}
