import { ALL_BUSINESS, DEPARTAMENT_BUSINESS, TECHNICALS_BUSINESS } from "../Actions/ActionsTypes";

const initialState = {
  business: [],
  departament: [],
  technicals:[]
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

    case TECHNICALS_BUSINESS:
      return{
        ...state,
        technicals: action.payload.data
      }
    default:
      return state;
  }
}
