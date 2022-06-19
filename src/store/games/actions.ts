import {ACTIONS, IGame} from "./reducer";

export const startLoading = () => ({type: ACTIONS.FETCHING_START});
export const setGames = (payload: IGame[]) => ({type: ACTIONS.FETCH_SUCCESS, payload});
export const setError = (payload: string) => ({type: ACTIONS.FETCH_ERROR, payload});
export const incrementHome = (payload: string) => ({type: ACTIONS.INCREMENT_HOME_COUNT, payload});
export const decrementHome = (payload: string) => ({type: ACTIONS.DECREMENT_HOME_COUNT, payload});
