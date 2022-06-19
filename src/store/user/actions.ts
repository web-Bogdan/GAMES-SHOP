import {ACTIONS, IUser} from "./reducer";

export const startLoading = () => ({type: ACTIONS.START_LOADING});
export const setUser = (data: IUser) => ({type: ACTIONS.LOG_IN, payload: data});
export const logOut = () => ({type: ACTIONS.LOG_OUT});
