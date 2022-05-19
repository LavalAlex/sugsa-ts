import {legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./Reducers"

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );