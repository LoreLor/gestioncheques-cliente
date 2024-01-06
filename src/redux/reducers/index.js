import { combineReducers } from "redux";
import { checksListReducer } from "./checksReducer";
import { detailCheckReducer } from "./detailCheckReducer";
import { loginReducer } from "./loginReducer";

export default combineReducers({
    checks: checksListReducer,
    detailCheck: detailCheckReducer,
    login: loginReducer, 
});