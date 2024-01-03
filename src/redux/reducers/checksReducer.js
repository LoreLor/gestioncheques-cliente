/* eslint-disable indent */
import {
    ADD_CHECK_ERROR,
    ADD_CHECK_REQUEST,
    ADD_CHECK_SUCCESS,
    ALL_CHECKS_ERROR,
    ALL_CHECKS_REQUEST,
    ALL_CHECKS_SUCCESS,
    DELETE_CHECK_ERROR,
    DELETE_CHECK_REQUEST,
    DELETE_CHECK_SUCCESS,
    UPDATE_CHECK_ERROR,
    UPDATE_CHECK_REQUEST,
    UPDATE_CHECK_SUCCESS,
} from "../actions/checks/actionsType";

const initialState = {
    checks: [],
    loading: true,
    error: {},
};

export const checksListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_CHECKS_REQUEST:
        case ADD_CHECK_REQUEST:
        case UPDATE_CHECK_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_CHECKS_SUCCESS:
            return {
                ...state,
                loading: false,
                checks: action.payload,
            };

        case ALL_CHECKS_ERROR:
        case ADD_CHECK_ERROR:
        case UPDATE_CHECK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case ADD_CHECK_SUCCESS:
            return {
                ...state,
                checks: action.payload,
                loading: false,
            };

        case UPDATE_CHECK_SUCCESS:
            return{
                ...state,
                loading: false,
                checks: action.payload
            };

        case DELETE_CHECK_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_CHECK_SUCCESS:
            return {
                ...state,
                loading: false,
                checks: state.checks.filter((check) => check.id !== action.payload),
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
