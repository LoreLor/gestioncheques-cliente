import { LOGIN_SUCCESS } from "../actions/checks/actionsType";

const initialState = {
    user: {},
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return { 
            ...state,
            user: action.payload
        };
    default:
        return state;
    }
};
