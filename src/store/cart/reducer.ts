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
    DELETE_ITEM = "DELETE_ITEM",
    INCREMENT_CART_COUNT = "INCREMENT_CART_COUNT",
    DECREMENT_CART_COUNT = "DECREMENT_CART_COUNT",
    CLEAR_CART = "CLEAR_CART"
}

interface ADD_TO_CART {
    type: ACTIONS.ADD_TO_CART;
    payload: IGame
}

interface DELETE_ITEM {
    type: ACTIONS.DELETE_ITEM;
    payload: string;
}

export interface INCREMENT_CART_COUNT {
    type: ACTIONS.INCREMENT_CART_COUNT,
    payload: string
}

export interface DECREMENT_CART_COUNT {
    type: ACTIONS.DECREMENT_CART_COUNT,
    payload: string
}

interface CLEAR_CART {
    type: ACTIONS.CLEAR_CART
}

type TAction = ADD_TO_CART | INCREMENT_CART_COUNT | DECREMENT_CART_COUNT | CLEAR_CART | DELETE_ITEM;

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
        case ACTIONS.DELETE_ITEM:
            const filteredList = state.cartList.filter(item => item._id !== action.payload);
            return {...state, cartList: filteredList};
        case ACTIONS.INCREMENT_CART_COUNT:
            const incrementCount = state.cartList.map(game => {
                if (game._id === action.payload){
                    game = {...game, count: game.count + 1, price: game.price + game.price / game.count};
                }
                return game;
            });
            return {...state, cartList: incrementCount};
        case ACTIONS.DECREMENT_CART_COUNT:
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
