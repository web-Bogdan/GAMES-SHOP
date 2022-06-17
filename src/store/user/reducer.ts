
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
    FETCH_USER = "FETCH_USER"
}

interface LOG_IN {
    type: ACTIONS.LOG_IN,
    payload: IUser
}

interface LOG_OUT {
    type: ACTIONS.LOG_OUT
}

interface FETCH_USER {
    type: ACTIONS.FETCH_USER
}

type TAction = LOG_IN | LOG_OUT | FETCH_USER;

const userReducer = (state = initialState, action: TAction) => {
    switch (action.type){
        case "LOG_IN":
            return {...state, user: action.payload, isAuth: true, isLoading: action.payload};
        case "LOG_OUT":
            return {...state, user: null, isAuth: false};
        case "FETCH_USER":
            return {...state, isLoading: true};
        default:
            return state;
    }
}

export default userReducer;
