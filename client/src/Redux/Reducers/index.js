import { combineReducers } from "redux";
import authReducer from "./Auth";
import ticketReducer from "./Ticket";
import adminReducer from "./Admin";
import businessReducer from "./Business";
import technicalReducer from "./Technicals";
import usersReducer from "./User";
import authAdminReducer from "./AuthAdmin";

const reducers = combineReducers({
  auth: authReducer,
  tickets: ticketReducer,
  admin: adminReducer,
  business: businessReducer,
  technical: technicalReducer,
  users: usersReducer,
  authAdmin:authAdminReducer
});

export default reducers;
