import {

  ALL_USERS,

} from "../Actions/ActionsTypes";

const initialState = {
  users: [],

};

export default function root(state = initialState, action) {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        users: action.payload.data,
      };


    default:
      return state;
  }
}
