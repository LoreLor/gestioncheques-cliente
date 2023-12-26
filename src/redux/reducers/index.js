import { combineReducers } from "redux";
import { checksListReducer } from "./checksReducer";
import { detailCheckReducer } from "./detailCheckReducer";

export default combineReducers({
    checks: checksListReducer,
    detailCheck: detailCheckReducer
});