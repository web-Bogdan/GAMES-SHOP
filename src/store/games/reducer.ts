
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
    gamesIsLoading: boolean;
    isFirstLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    gamesList: [],
    hotGames: [],
    gamesIsLoading: false,
    isFirstLoading: true,
    error: null
};

export enum ACTIONS {
    FETCHING_START = "START_LOADING",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_ERROR = "FETCH_ERROR",
    INCREMENT_HOME_COUNT = "INCREMENT_HOME_COUNT",
    DECREMENT_HOME_COUNT = "DECREMENT_HOME_COUNT"
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

export interface INCREMENT_HOME_COUNT {
    type: ACTIONS.INCREMENT_HOME_COUNT,
    payload: string
}

export interface DECREMENT_HOME_COUNT {
    type: ACTIONS.DECREMENT_HOME_COUNT,
    payload: string
}

type TAction = FETCHING_START | FETCH_SUCCESS | FETCH_ERROR | INCREMENT_HOME_COUNT | DECREMENT_HOME_COUNT;

const gamesReducer = (state= initialState, action: TAction) => {
    switch (action.type) {
        case ACTIONS.FETCHING_START:
            return {...state, gamesIsLoading: true};
        case ACTIONS.FETCH_SUCCESS:
            const hotGamesList = action.payload.filter(game => game.isHot);
            return {...state, gamesList: action.payload, hotGames: hotGamesList, gamesIsLoading: false, isFirstLoading: false};
        case ACTIONS.FETCH_ERROR:
            return {...state, error: action.payload};
        case ACTIONS.INCREMENT_HOME_COUNT:
            const incrementCount = state.gamesList.map(game => {
                if (game._id === action.payload && game.count < 20){
                    game = {...game, count: game.count + 1, price: game.price + game.price / game.count};
                }
                return game;
            });
            return {...state, gamesList: incrementCount};
        case ACTIONS.DECREMENT_HOME_COUNT:
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


