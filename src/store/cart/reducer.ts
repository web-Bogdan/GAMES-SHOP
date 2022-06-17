import {IGame} from "../games/reducer";

interface IInitialState {
    cartList: IGame[] | [];
    totalPrice: number;
}

const initialState: IInitialState = {
    cartList: [],
    totalPrice: 0
};

export enum ACTIONS {
    ADD_TO_CART = "ADD_TO_CART",
    INCREMENT_COUNT = "INCREMENT_COUNT",
    DECREMENT_COUNT = "DECREMENT_COUNT",
    CLEAR_CART = "CLEAR_CART"
}

interface ADD_TO_CART {
    type: ACTIONS.ADD_TO_CART;
    payload: IGame
}

export interface INCREMENT_COUNT {
    type: ACTIONS.INCREMENT_COUNT,
    payload: string
}

export interface DECREMENT_COUNT {
    type: ACTIONS.DECREMENT_COUNT,
    payload: string
}

interface CLEAR_CART {
    type: ACTIONS.CLEAR_CART
}

type TAction = ADD_TO_CART | INCREMENT_COUNT | DECREMENT_COUNT | CLEAR_CART;

const cartReducer = (state = initialState, action: TAction) => {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART:
            const check = state.cartList.find(game => game._id === action.payload._id);
            let newCartList;
            if (!check){
                newCartList = [...state.cartList, action.payload];
            } else {
                newCartList = state.cartList.map(game => {
                    if (game._id === check._id){
                        game = {...game, count: game.count + action.payload.count, price: game.price + action.payload.price};
                    }
                    return game;
                });
            }
            return {...state, cartList: newCartList}
        case ACTIONS.INCREMENT_COUNT:
            const incrementCount = state.cartList.map(game => {
                if (game._id === action.payload){
                    game = {...game, count: game.count + 1, price: game.price + game.price / game.count};
                }
                return game;
            });
            return {...state, cartList: incrementCount};
        case ACTIONS.DECREMENT_COUNT:
            const decrementCount = state.cartList.map(game => {
                if (game._id === action.payload){
                    game = {...game, count: game.count - 1, price: game.price - game.price / game.count};
                }
                return game;
            });
            return {...state, cartList: decrementCount};
        case ACTIONS.CLEAR_CART:
            return {...state, cartList: []};
        default:
            return state;
    }
};

export default cartReducer;
