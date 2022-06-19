
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    photo: string | null;
    provider: "email" | "phone";
}

interface IInitialState {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
}

const initialState: IInitialState = {
    user: null,
    isAuth: false,
    isLoading: false
}

export enum ACTIONS {
    LOG_IN = "LOG_IN",
    LOG_OUT = "LOG_OUT",
    START_LOADING = "START_LOADING"
}

interface LOG_IN {
    type: ACTIONS.LOG_IN,
    payload: IUser
}

interface LOG_OUT {
    type: ACTIONS.LOG_OUT
}

interface START_LOADING {
    type: ACTIONS.START_LOADING
}

type TAction = LOG_IN | LOG_OUT | START_LOADING;

const userReducer = (state = initialState, action: TAction) => {
    switch (action.type){
        case ACTIONS.LOG_IN:
            return {...state, user: action.payload, isAuth: true, isLoading: false};
        case ACTIONS.LOG_OUT:
            return {...state, user: null, isAuth: false, isLoading: false};
        case ACTIONS.START_LOADING:
            return {...state, isLoading: true};
        default:
            return state;
    }
}

export default userReducer;
