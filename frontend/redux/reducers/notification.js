import { PUSH_NOTIFICATION, REMOVE_NOTIFICATION, RESET_NOTIFICATIONS } from '../constants/notification';

const initialState = {
    messages: {},
    isReset: false,
};

const REDUCER_HANDLERS = {
    [PUSH_NOTIFICATION]: (state, { payload = {} }) => {
        const message = (payload && (payload.apierror || payload.apisuccess)) || payload;
        // const messageKey = message.code || 'default';
        // const spanIdKey = message.spanId;
        const messageKey = message.httpcode;
        const updatedState = {
            messages: { ...state.messages, [messageKey]: { message } }, isReset: false,
        };
        return updatedState;
    },
    [REMOVE_NOTIFICATION]: (state, { payload }) => {
        const { messages } = state;
        delete messages[payload.key];
        return { messages: { ...messages }, isReset: false };
    },
    [RESET_NOTIFICATIONS]: () => ({ isReset: true, messages: {} }),
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function notifyReducer(state = initialState, action = {}) {
    const handler = REDUCER_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
