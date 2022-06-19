import {IGame} from "../games/reducer";
import {ACTIONS} from "./reducer";

export const addToCart = (payload: IGame) => ({type: ACTIONS.ADD_TO_CART, payload});
export const clearingCart = () => ({type: ACTIONS.CLEAR_CART});
export const incrementCart = (payload: string) => ({type: ACTIONS.INCREMENT_CART_COUNT, payload});
export const decrementCart = (payload: string) => ({type: ACTIONS.DECREMENT_CART_COUNT, payload});
