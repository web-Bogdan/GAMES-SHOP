import {combineReducers, createStore} from "redux";
import userReducer from "./user/reducer";
import gamesReducer from "./games/reducer";
import cartReducer from "./cart/reducer";
const rootReducer = combineReducers({
    userReducer,
    gamesReducer,
    cartReducer
});


export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;


