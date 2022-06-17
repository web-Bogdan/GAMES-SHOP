import {ACTIONS, IUser} from "./reducer";

export const setLoading = (isLoading: boolean) => ({type: ACTIONS.FETCH_USER, payload: isLoading});
export const setUser = (data: IUser) => ({type: ACTIONS.LOG_IN, payload: data});
export const logOut = () => ({type: ACTIONS.LOG_OUT});
