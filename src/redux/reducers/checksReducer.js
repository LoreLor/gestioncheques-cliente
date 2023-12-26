/* eslint-disable indent */
import {
    ALL_CHECKS_ERROR,
    ALL_CHECKS_REQUEST,
    ALL_CHECKS_SUCCESS,
    DELETE_CHECK_ERROR,
    DELETE_CHECK_REQUEST,
    DELETE_CHECK_SUCCESS,
} from "../actions/checks/actionsType";

const initialState = {
    checks: [],
    loading: true,
    error: {},
};

export const checksListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_CHECKS_REQUEST:
            return {
                loading: true,
            };
        case ALL_CHECKS_SUCCESS:
            return {
                loading: false,
                checks: action.payload,
            };
        case ALL_CHECKS_ERROR:
            return {
                loading: false,
                error: action.payload
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
            }

        case DELETE_CHECK_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
};
