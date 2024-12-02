import {
    GET_EMPLOYEE_FAILURE, GET_EMPLOYEE_REQUEST, GET_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE_DETAILS_REQUEST, GET_EMPLOYEE_DETAILS_SUCCESS, GET_EMPLOYEE_DETAILS_FAILURE,
    DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_FAILURE,
    UPDATE_EMPLOYEE_DETAILS_REQUEST, UPDATE_EMPLOYEE_DETAILS_SUCCESS, UPDATE_EMPLOYEE_DETAILS_FAILURE,
    ADD_EMPLOYEE_DETAILS_REQUEST, ADD_EMPLOYEE_DETAILS_SUCCESS, ADD_EMPLOYEE_DETAILS_FAILURE,
    UPDATE_EMPLOYEE_NAME

} from "../Types/employeeTypes"

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

const detailsInitialState = {
    data: {},
    isLoading: false,
    isError: false,
}

const deleteInitialState = {
    data: {},
    isLoading: false,
    isError: false,
}

const updateInitialState = {
    data: {},
    isUpdateLoading: false,
    isError: false,
}


export const getEmployee = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case GET_EMPLOYEE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            }
        case GET_EMPLOYEE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state;
    }
}

// export const updateEmployeeName = (state = updateInitialState, action) => {
//     return {
//        ...state,
//         userName: action.payload,
//     }
// }
export const getEmployeeDetails = (state = detailsInitialState, action) => {

    switch (action.type) {
        case GET_EMPLOYEE_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case GET_EMPLOYEE_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            }
        case GET_EMPLOYEE_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
            case UPDATE_EMPLOYEE_NAME:
            return {
                ...state,
                data: {
                    ...state.data,
                    fullName: action.payload,
                },
            }
        default:
            return state;
    }
}

export const deleteEmployee = (state = deleteInitialState, action) => {
    switch (action.type) {
        case DELETE_EMPLOYEE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            }
        case DELETE_EMPLOYEE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state;
    }
}


export const updateEmployee = (state = updateInitialState, action) => {
    switch (action.type) {
        case UPDATE_EMPLOYEE_DETAILS_REQUEST:
            return {
                ...state,
                isUpdateLoading: true,
                isError: false,
            }
        case UPDATE_EMPLOYEE_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isUpdateLoading: false,
                isError: false,
            }
        case UPDATE_EMPLOYEE_DETAILS_FAILURE:
            return {
                ...state,
                isUpdateLoading: false,
                isError: true,
            }
        case UPDATE_EMPLOYEE_NAME:
            return {
                ...state,
                data: {
                    ...state.data,
                    fullName: action.payload,
                },
            }
        default:
            return state;
    }
}

export const addEmployee = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case ADD_EMPLOYEE_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            }
        case ADD_EMPLOYEE_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state;
    }
}