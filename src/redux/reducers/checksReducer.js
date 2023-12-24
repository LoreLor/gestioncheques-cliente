/* eslint-disable indent */
import {
    ALL_CHECKS_ERROR,
    ALL_CHECKS_REQUEST,
    ALL_CHECKS_SUCCESS,
} from "../actions/checks/actionsType";

const initialState = {
    cheks: [],
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
            }
        default:
            return state;
    }
};
