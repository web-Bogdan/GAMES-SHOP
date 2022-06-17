import axios from "axios";
import {GAMES_API_URL} from "../utils/consts/consts";

export const GamesApi = {
   loadingGames: async () => {
       const response = await axios(GAMES_API_URL);
       return response;
   }
}
