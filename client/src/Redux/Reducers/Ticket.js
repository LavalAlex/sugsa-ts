import {
  ALL_TICKETS,
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

    case FILTER_TICKET_ADMIN:
      return {
        ...state,
        tickets: action.payload.data,
      };
    default:
      return state;
  }
}
