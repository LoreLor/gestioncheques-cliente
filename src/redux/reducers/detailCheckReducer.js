import {
    CHECK_DETAIL_ERROR,
    CHECK_DETAIL_REQUEST,
    CHECK_DETAIL_SUCCESS,
    DELETE_CHECK_ERROR,
    DELETE_CHECK_SUCCESS,
} from "../actions/checks/actionsType";

const initialState = {
    detail: {},
    loading: true,
    error: {},
};

export const detailCheckReducer = (state = initialState, action) => {
    switch (action.type) {
    case CHECK_DETAIL_REQUEST:
        return {
            loading: true,
        };
    case CHECK_DETAIL_SUCCESS:
        return {
            loading: false,
            detail: action.payload,
        };
    case CHECK_DETAIL_ERROR:
        return {
            loading: false,
            error: action.payload,
        };
    case DELETE_CHECK_SUCCESS:
        return {
            ...state,
            detail: {}
        };
    case DELETE_CHECK_ERROR:
        return {
            ...state,
            error: action.payload
        };
    default:
        return state;
    }
};
