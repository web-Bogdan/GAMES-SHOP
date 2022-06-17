
export interface IGame {
    _id: string;
    name: string;
    price: number;
    url: string;
    isHot: boolean;
    count: number;
}

interface IInitialState {
    gamesList: IGame[] | [];
    hotGames: IGame[] | [];
    isLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    gamesList: [],
    hotGames: [],
    isLoading: false,
    error: null
};

export enum ACTIONS {
    FETCHING_START = "START_LOADING",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_ERROR = "FETCH_ERROR",
    INCREMENT_COUNT = "INCREMENT_COUNT",
    DECREMENT_COUNT = "DECREMENT_COUNT"
}

export interface FETCHING_START {
    type: ACTIONS.FETCHING_START
}

export interface FETCH_SUCCESS {
    type: ACTIONS.FETCH_SUCCESS,
    payload: IGame[]
}

export interface FETCH_ERROR {
    type: ACTIONS.FETCH_ERROR,
    payload: string
}

export interface INCREMENT_COUNT {
    type: ACTIONS.INCREMENT_COUNT,
    payload: string
}

export interface DECREMENT_COUNT {
    type: ACTIONS.DECREMENT_COUNT,
    payload: string
}

type TAction = FETCHING_START | FETCH_SUCCESS | FETCH_ERROR | INCREMENT_COUNT | DECREMENT_COUNT;

const gamesReducer = (state= initialState, action: TAction) => {
    switch (action.type) {
        case ACTIONS.FETCHING_START:
            return {...state, isLoading: true};
        case ACTIONS.FETCH_SUCCESS:
            const hotGamesList = action.payload.filter(game => game.isHot);
            return {...state, gamesList: action.payload, hotGames: hotGamesList, isLoading: false};
        case ACTIONS.FETCH_ERROR:
            return {...state, error: action.payload};
        case ACTIONS.INCREMENT_COUNT:
            const incrementCount = state.gamesList.map(game => {
                if (game._id === action.payload){
                    game = {...game, count: game.count + 1, price: game.price + game.price / game.count};
                }
                return game;
            });
            return {...state, gamesList: incrementCount};
        case ACTIONS.DECREMENT_COUNT:
            const decrementCount = state.gamesList.map(game => {
                if (game._id === action.payload){
                    game = {...game, count: game.count - 1, price: game.price - game.price / game.count};
                }
                return game;
            });
            return {...state, gamesList: decrementCount};
        default:
            return state;
    }
};

export default gamesReducer;


