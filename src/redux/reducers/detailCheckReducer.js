import { CHECK_DETAIL_ERROR, CHECK_DETAIL_REQUEST, CHECK_DETAIL_SUCCESS } from "../actions/checks/actionsType";

const initialState = {
    detail: {},
    loading: true,
    error: {}
}

export const detailCheckReducer = (state = initialState, action) => {
    switch (action.type) {
    case CHECK_DETAIL_REQUEST:
        return {
            loading: true,
        }
    case CHECK_DETAIL_SUCCESS:
        return {
            loading: false,
            detail: action.payload
        }
    case CHECK_DETAIL_ERROR:
        return {
            loading: false,
            error: action.payload
        }
    default:
        return state;
    }
}