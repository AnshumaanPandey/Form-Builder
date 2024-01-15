import { combineReducers } from "redux";
import { reducer } from "./reducer";


export const rootReducer = combineReducers({
    fields : reducer
})