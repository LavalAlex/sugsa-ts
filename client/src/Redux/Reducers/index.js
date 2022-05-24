import { combineReducers } from "redux";
import authReducer from "./Auth";
import ticketReducer from "./Ticket";
import adminReducer from "./Admin";
import businessReducer from "./Business";

const reducers = combineReducers({
  auth: authReducer,
  tickets: ticketReducer,
  admin: adminReducer,
  business: businessReducer,
});

export default reducers;
