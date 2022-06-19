import {ACTIONS, IUser} from "./reducer";

export const setLoading = (payload: boolean) => ({type: ACTIONS.SET_LOADING, payload});
export const setUser = (data: IUser) => ({type: ACTIONS.LOG_IN, payload: data});
export const logOut = () => ({type: ACTIONS.LOG_OUT});
