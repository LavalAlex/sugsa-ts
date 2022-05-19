import {
  ALL_ROLES,
  ALL_USERS,
  GET_USER_NAME,
  NEW_PASSWORD,
  NEW_USER,
} from "../Actions/ActionsTypes";

const initialState = {
  users: [],
  roles: [],
  userName: [],
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        users: action.payload,
        userName: action.payload,
      };

    case NEW_USER:
      return {
        ...state,
      };
      
    case ALL_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    case NEW_PASSWORD:
      return {
        ...state,
      };

    case GET_USER_NAME:
      const users = state.userName;
      if (action.payload) {
        var userFilter = users.filter((e) =>
          e.Nombre.toLowerCase().includes(action.payload)
        );
      } else {
        userFilter = state.userName;
      }
      return {
        ...state,
        users: userFilter,
      };

    default:
      return state;
  }
}
