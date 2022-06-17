import {ACTIONS, IGame} from "./reducer";

export const startLoading = () => ({type: ACTIONS.FETCHING_START});
export const setGames = (payload: IGame[]) => ({type: ACTIONS.FETCH_SUCCESS, payload});
export const setError = (payload: string) => ({type: ACTIONS.FETCH_ERROR, payload});
export const increment = (payload: string) => ({type: ACTIONS.INCREMENT_COUNT, payload});
export const decrement = (payload: string) => ({type: ACTIONS.DECREMENT_COUNT, payload});
