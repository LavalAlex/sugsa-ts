import axios from "axios";
import { URL_CREATE_DEPARTAMENT, CREATE_DEPARTAMENT, URL_ALL_DEPARTAMENT, ALL_DEPARTAMENT, URL_UPDATE_DEPARTAMENT, UPDATE_DEPARTAMENT } from "./ActionsTypes";

export const createDepartament = (name) => {
  return  async (dispatch)=> {
  try{
    const  response = await axios.post(URL_CREATE_DEPARTAMENT, {name});
    dispatch({type: CREATE_DEPARTAMENT, payload: response})
  } catch (e) {
    console.log(e)
    return e.response.data
  }
  }
};

export const allDepartament =   ()=>{
    return async  (dispatch)=>{
        try{
            const response = await axios.get(URL_ALL_DEPARTAMENT)
            dispatch({type: ALL_DEPARTAMENT, payload: response})
        }catch(e){
            console.log(e)
            return e.response.data
        }
    }
}

export const updateDepartamentAdmin = (data)=>{
  return async (dispatch) => {
    try{
      const response = await axios.put(URL_UPDATE_DEPARTAMENT, data)
      dispatch({type: UPDATE_DEPARTAMENT, payload: response})
    }catch(e){
      console.log(e)
      return e.response.data
    }
  }
}