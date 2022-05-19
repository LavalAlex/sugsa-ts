import { combineReducers } from "redux";
import authReducer from "./Auth";
import ticketReducer from './Ticket'

const reducers = combineReducers({
  auth: authReducer,
  tickets:ticketReducer
});

export default reducers;
