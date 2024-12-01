import { GET_EMPLOYEE_FAILURE, GET_EMPLOYEE_REQUEST, GET_EMPLOYEE_SUCCESS } from "../Types/employeeTypes"

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

export const getEmployee = (state = initialState, action) =>{
    switch(action.type){
        case GET_EMPLOYEE_REQUEST :
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case GET_EMPLOYEE_SUCCESS : 
        return{
               ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            }
        case GET_EMPLOYEE_FAILURE :
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
       default :
        return state;
    }
}


// export const getEmployee = (state = initialState, action) =>{
//     switch(action.type){
//         case GET_EMPLOYEE_REQUEST :
//             return{
//                 ...state,
//                 isLoading: true,
//                 isError: false,
//             }
//         case GET_EMPLOYEE_SUCCESS : 
//         return{
//                ...state,
//                 data: action.payload,
//                 isLoading: false,
//                 isError: false,
//             }
//         case GET_EMPLOYEE_FAILURE :
//             return{
//                 ...state,
//                 isLoading: false,
//                 isError: true,
//             }
//        default :
//         return state;
//     }
// }