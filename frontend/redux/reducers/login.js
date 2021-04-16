// ------------------------------------
// Imports
// ------------------------------------
import {
    LOGIN_USER_START, ERROR_USER_LOGIN,
    LOGIN_USER_END, REFRESH_TOKEN_END,
    ERROR_REFRESH_TOKEN,
} from '../constants/login';

// ------------------------------------
// Reducer Handlers
// ------------------------------------
export const initialState = {
    isProcessing: false,
    isError: false,
    info: {},
};

const REDUCER_HANDLERS = {
    [LOGIN_USER_START]: () => ({ ...initialState, isProcessing: true }),
    [ERROR_USER_LOGIN]: () => ({ ...initialState, isError: true }),
    [LOGIN_USER_END]: (state, action) => ({ ...initialState, info: action.payload }),
    [REFRESH_TOKEN_END]: (state, action) => ({ ...state, info: action.payload }),
    [ERROR_REFRESH_TOKEN]: (state) => ({ ...state, isError: true }),
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function loginReducer(state = initialState, action = {}) {
    const handler = REDUCER_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}