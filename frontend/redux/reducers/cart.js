// ------------------------------------
// Imports
// ------------------------------------
import {
    HANDLE_INCREASE_QUANTITY, HANDLE_DECREASE_QUANTITY,
    HANDLE_ADD_TO_CART,
} from '../constants/cart';

// ------------------------------------
// Reducer Handlers
// ------------------------------------
export const initialState = {
    cartItems: [],
};

const REDUCER_HANDLERS = {
    [HANDLE_INCREASE_QUANTITY]: (state, action) => {
        const elementIndex = action?.payload?.index || 0;
        const targetElement = { ...state.cartItems[elementIndex] };
        if (targetElement.stock > targetElement.quantity) {
            targetElement.quantity = targetElement.quantity + 1;
        }
        return {
            ...state,
            cartItems: [
                ...state.cartItems.slice(0, elementIndex),
                { ...targetElement },
                ...state.cartItems.slice(elementIndex + 1)
            ]
        };
    },
    [HANDLE_DECREASE_QUANTITY]: (state, action) => {
        const elementIndex = action?.payload?.index || 0;
        const targetElement = { ...state.cartItems[elementIndex] };
        if (targetElement.quantity === 1) {
            return {
                ...state,
                cartItems: [
                    ...state.cartItems.slice(0, elementIndex),
                    ...state.cartItems.slice(elementIndex + 1)
                ]
            };
        }
        targetElement.quantity = targetElement.quantity - 1;
        return {
            ...state,
            cartItems: [
                ...state.cartItems.slice(0, elementIndex),
                { ...targetElement },
                ...state.cartItems.slice(elementIndex + 1)
            ]
        };
    },
    [HANDLE_ADD_TO_CART]: (state, action) => {
        const newProduct = action?.payload || {};
        const isProductAlreadyInCart = state.cartItems.some(element => element.id === newProduct.id);
        if(!isProductAlreadyInCart) {
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    {
                        ...newProduct,
                        quantity: 1
                    }
                ]
            }
        }
       return {
            ...state,
        };
    },
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function cartReducer(state = initialState, action = {}) {
    const handler = REDUCER_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}