import { ALL_BUSINESS, DEPARTAMENT_BUSINESS } from "../Actions/ActionsTypes";

const initialState = {
  business: [],
  departament: []
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case ALL_BUSINESS:
      return {
        ...state,
        business: action.payload.data,
      };

    case DEPARTAMENT_BUSINESS:
      return{
        ...state,
        departament: action.payload.data
      }
    default:
      return state;
  }
}
