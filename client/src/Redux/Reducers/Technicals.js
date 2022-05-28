import {  ALL_TECHNICALS } from "../Actions/ActionsTypes";

const initialState = {
 technical: []
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case ALL_TECHNICALS:
      return {
        ...state,
        technical: action.payload.data,
      };

    default:
      return state;
  }
}
