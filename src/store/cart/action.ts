import {IGame} from "../games/reducer";
import {ACTIONS} from "./reducer";

export const addToCart = (payload: IGame) => ({type: ACTIONS.ADD_TO_CART, payload});
export const clearingCart = () => ({type: ACTIONS.CLEAR_CART});
