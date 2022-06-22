import {
  ALL_TICKETCONFIG,
  ALL_TICKETS,
  ALL_TICKETS_ADMIN,
  CREATE_TICKET_ADMIN,
  DELETE_TICKET_ADMIN,
  EDIT_TICKET,
  FILTER_TICKET_ADMIN,
  NEW_TICKET,
  ORDER_TICKETS,
  TICKET_ID,
} from "../Actions/ActionsTypes";

const initialState = {
  tickets: [],
  allTicket: [],
  ticketId: [],
  ticketConfig: [],
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
        allTicket: action.payload.data,
        ticketId: action.payload.data,
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
      return {
        ...state,
      };

    case CREATE_TICKET_ADMIN:
      return {
        ...state,
      };

    case ORDER_TICKETS:
      const allTicket = state.allTicket;
      if (action.payload) {
        allTicket.sort((a, b) => {
          if (a._id > b._id) return 1;
          if (a._id < b._id) return -1;
          return 0;
        });
      } else {
        allTicket.sort((a, b) => {
          if (a._id < b._id) return 1;
          if (a._id > b._id) return -1;
          return 0;
        });
      }
      return {
        ...state,
        tickets: allTicket,
      };

    case TICKET_ID:
      const tickets = state.ticketId;
      if (action.payload) {
        var ticketFilter = tickets.filter((e) => e._id === action.payload);
      } else {
        ticketFilter = state.ticketId;
      }
      return {
        ...state,
        tickets: ticketFilter,
      };

    case ALL_TICKETCONFIG:
      console.log(action.payload)
      return{
        ...state,
        ticketConfig: action.payload.data
      }
    default:
      return state;
  }
}
