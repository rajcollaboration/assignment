import { combineReducers } from "redux";
import { dataReducer } from "./dataReducer";
import { addEmployee, deleteEmployee, getEmployee, getEmployeeDetails, updateEmployee } from "./employeeReducer";

export const mergeReducers = combineReducers({
    data : dataReducer,
    employeeList: getEmployee,
    details: getEmployeeDetails,
    deleteEmpl: deleteEmployee,
    updateEmpl: updateEmployee,
    addEmpl: addEmployee
})