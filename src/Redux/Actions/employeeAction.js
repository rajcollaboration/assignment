import { httpRequest } from "../../services/helper";
import { GET_EMPLOYEE_FAILURE, GET_EMPLOYEE_REQUEST, GET_EMPLOYEE_SUCCESS } from "../Types/employeeTypes"

export const getEmployee = () => {
    return async(dispatch) => {
        console.log("okay 2");
        
        dispatch({type: GET_EMPLOYEE_REQUEST});
        // fetch data from API
        try {
            const response = await httpRequest("get","users/employee/list");
            console.log(response.data);
            
            dispatch({type: GET_EMPLOYEE_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({type: GET_EMPLOYEE_FAILURE, payload:error});
        }
    }
}


export const deleteEmployee = () => {
    return async(dispatch) => {
        console.log("okay 2");
        
        dispatch({type: GET_EMPLOYEE_REQUEST});
        // fetch data from API
        try {
            const response = await httpRequest("get","users/employee/list");
            console.log(response.data);
            
            dispatch({type: GET_EMPLOYEE_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({type: GET_EMPLOYEE_FAILURE, payload:error});
        }
    }
}