import {
  HANDLE_INCREASE_QUANTITY, HANDLE_DECREASE_QUANTITY,
  HANDLE_ADD_TO_CART,
} from '../constants/cart';

export const handleIncreaseQuantity = (payload) => (dispatch) => {
    return dispatch({ type: HANDLE_INCREASE_QUANTITY, payload });
}

export const handleDecreaseQuantity = (payload) => (dispatch) => {
    return dispatch({ type: HANDLE_DECREASE_QUANTITY, payload });
}

export const handleAddToCart = (payload) => (dispatch) => {
    return dispatch({ type: HANDLE_ADD_TO_CART, payload });
}
