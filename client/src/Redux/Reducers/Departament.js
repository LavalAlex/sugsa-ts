import { ALL_DEPARTAMENT } from "../Actions/ActionsTypes";

const initialState = {
  departament: [],
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case ALL_DEPARTAMENT:
      return {
        ...state,
        departament: action.payload.data,
      };
    default:
      return state;
  }
}
