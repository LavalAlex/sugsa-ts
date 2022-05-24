import {
  ALL_TICKETS,
  ALL_TICKETS_ADMIN,
  DELETE_TICKET_ADMIN,
  EDIT_TICKET,
  FILTER_TICKET_ADMIN,
  NEW_TICKET,
} from "../Actions/ActionsTypes";

const initialState = {
  tickets: [],
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case NEW_TICKET:
      return {
        ...state,
      };

    case ALL_TICKETS:
      return {
        ...state,
        tickets: action.payload.data,
      };

    case ALL_TICKETS_ADMIN:
      return {
        ...state,
        tickets: action.payload.data,
      };

    case EDIT_TICKET:
      return {
        ...state,
      };
      
    case FILTER_TICKET_ADMIN:
      return {
        ...state,
        tickets: action.payload.data,
      };

    case DELETE_TICKET_ADMIN:
      return{
        ...state
      }
    default:
      return state;
  }
}
