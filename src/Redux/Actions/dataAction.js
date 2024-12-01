import { GET_DATA_FAILURE, GET_DATA_REQUEST, GET_DATA_SUCCESS } from "../Types/doctorsTypes"

export const getBlog = () => {
    return async(dispatch) => {
        dispatch({type: GET_DATA_REQUEST});
        // fetch data from API
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            dispatch({type: GET_DATA_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_DATA_FAILURE, payload:error});
        }
    }
}