
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
    userIsLoading: boolean;
}

const initialState: IInitialState = {
    user: null,
    isAuth: false,
    userIsLoading: false
}

export enum ACTIONS {
    LOG_IN = "LOG_IN",
    LOG_OUT = "LOG_OUT",
    SET_LOADING = "SET_LOADING"
}

interface LOG_IN {
    type: ACTIONS.LOG_IN,
    payload: IUser
}

interface LOG_OUT {
    type: ACTIONS.LOG_OUT
}

interface SET_LOADING {
    type: ACTIONS.SET_LOADING,
    payload: boolean
}

type TAction = LOG_IN | LOG_OUT | SET_LOADING;

const userReducer = (state = initialState, action: TAction) => {
    switch (action.type){
        case ACTIONS.LOG_IN:
            return {...state, user: action.payload, isAuth: true, userIsLoading: false};
        case ACTIONS.LOG_OUT:
            return {...state, user: null, isAuth: false, userIsLoading: false};
        case ACTIONS.SET_LOADING:
            return {...state, userIsLoading: action.payload};
        default:
            return state;
    }
}

export default userReducer;
