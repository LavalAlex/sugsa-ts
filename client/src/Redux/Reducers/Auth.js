import Cookie from "universal-cookie";
import { saveLocal } from "../../Utils/storage";
import { LOGIN, LOGIN_ADMIN, LOGOUT, LOGOUT_ADMIN, SIGNUP } from "../Actions/ActionsTypes";
const cookie = new Cookie();
const initialState = cookie.get("sugsa") || {};

export default function root(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      saveLocal("sugsa", action.payload.data);
      cookie.set("sugsa", action.payload.data);
      return cookie.get("sugsa");

    case SIGNUP:
      return {
        ...state,
        state: action.payload.status,
      };

    case LOGOUT:
      cookie.remove("sugsa");
      return {};

    case LOGIN_ADMIN:
      saveLocal("sugsa", action.payload.data);
      cookie.set("sugsa", action.payload.data);
      return cookie.get("sugsa");

    case LOGOUT_ADMIN:
      cookie.remove("sugsa");
      return {};

    default:
      return state;
  }
}
