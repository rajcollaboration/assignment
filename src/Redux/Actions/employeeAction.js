import { httpRequest } from "../../services/helper";
import {
    GET_EMPLOYEE_FAILURE, GET_EMPLOYEE_REQUEST, GET_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE_DETAILS_REQUEST, GET_EMPLOYEE_DETAILS_SUCCESS, GET_EMPLOYEE_DETAILS_FAILURE,
    DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_FAILURE,
    UPDATE_EMPLOYEE_DETAILS_REQUEST, UPDATE_EMPLOYEE_DETAILS_SUCCESS, UPDATE_EMPLOYEE_DETAILS_FAILURE,
    ADD_EMPLOYEE_DETAILS_REQUEST, ADD_EMPLOYEE_DETAILS_SUCCESS, ADD_EMPLOYEE_DETAILS_FAILURE,
    UPDATE_EMPLOYEE_NAME


} from "../Types/employeeTypes"

export const getEmployee = () => {
    return async (dispatch) => {

        dispatch({ type: GET_EMPLOYEE_REQUEST });
        // fetch data from API
        try {
            const response = await httpRequest("get", "users/employee/list");

            dispatch({ type: GET_EMPLOYEE_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_EMPLOYEE_FAILURE, payload: error });
        }
    }
}

export const deleteEmployee = (id) => {
    return async (dispatch) => {

        dispatch({ type: DELETE_EMPLOYEE_REQUEST });
        // fetch data from API
        try {
            const response = await httpRequest("delete", `users/employee-remove/${id}`);
            if (response?.data) {
                alert("Employee deleted seccessfully !!")
            }
            dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: response?.data });
        } catch (error) {
            dispatch({ type: DELETE_EMPLOYEE_FAILURE, payload: error });
        }
    }
}


export const getEmployeeById = (id) => {
    return async (dispatch) => {

        dispatch({ type: GET_EMPLOYEE_DETAILS_REQUEST });
        // fetch data from API
        try {
            const response = await httpRequest("get", `users/employee/${id}`);

            dispatch({ type: GET_EMPLOYEE_DETAILS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_EMPLOYEE_DETAILS_FAILURE, payload: error });
        }
    }
}

export const updateName = (name) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_EMPLOYEE_NAME, payload: name})
    }
}
export const updateEmployee = (id, data, navigate) => {
    return async (dispatch) => {

        dispatch({ type: UPDATE_EMPLOYEE_DETAILS_REQUEST });
        
        // fetch data from API
        try {
            const response = await httpRequest("put", `users/employee-update/${id}`, data);
            if (response.data) {
                alert("Employee updated successfully!");
                navigate(-1);
            }
            dispatch({ type: UPDATE_EMPLOYEE_DETAILS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: UPDATE_EMPLOYEE_DETAILS_FAILURE, payload: error });
        }
    }
}
export const addEmployee = (data, navigate) => {
    return async (dispatch) => {

        dispatch({ type: ADD_EMPLOYEE_DETAILS_REQUEST });
        // fetch data from API
        try {
            const response = await httpRequest("post", `users/employee/create`, data);
            if (response.data) {
                alert("Employee added successfully!");
                navigate(-1);
            }
            dispatch({ type: ADD_EMPLOYEE_DETAILS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ADD_EMPLOYEE_DETAILS_FAILURE, payload: error });
        }
    }
}