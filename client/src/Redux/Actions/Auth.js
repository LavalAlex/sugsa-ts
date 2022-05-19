import axios from "axios";
import { LOGIN, LOGOUT, URL_LOGIN } from "./ActionsTypes";

export function login(user) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_LOGIN, user);
      console.log(response)
      dispatch({ type: LOGIN, payload: response });
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
