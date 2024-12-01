import { combineReducers } from "redux";
import { dataReducer } from "./dataReducer";
import { getEmployee } from "./employeeReducer";

export const mergeReducers = combineReducers({
    data : dataReducer,
    employeeList: getEmployee
})