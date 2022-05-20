import { combineReducers } from "redux";
import authReducer from "./Auth";
import ticketReducer from './Ticket'
import adminReducer from './Admin'

const reducers = combineReducers({
  auth: authReducer,
  tickets:ticketReducer,
  admin: adminReducer
});

export default reducers;
