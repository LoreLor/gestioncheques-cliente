import { combineReducers } from "redux";
import { checksListReducer } from "./checksReducer";

export default combineReducers({
    checks: checksListReducer,
})