import Cookie from "universal-cookie";
import { saveLocal } from "../../Utils/storage";
import { EDIT_TICKET_ADMIN, LOGIN_ADMIN, LOGOUT_ADMIN } from "../Actions/ActionsTypes";
const cookie = new Cookie();
const initialState = cookie.get("sugsa") || {};

export default function root(state = initialState, action) {
  switch (action.type) {

    case EDIT_TICKET_ADMIN: 
    return{
      ...state
    }
    default:
      return state;
  }
}
