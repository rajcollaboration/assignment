import { GET_DATA_FAILURE, GET_DATA_REQUEST, GET_DATA_SUCCESS } from "../Types/doctorsTypes"

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

export const dataReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_DATA_REQUEST :
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case GET_DATA_SUCCESS : 
        return{
               ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            }
        case GET_DATA_FAILURE :
            return{
                ...state,
                error: action.payload,
                isLoading: false,
                isError: true,
            }
       default :
        return state;
    }
}