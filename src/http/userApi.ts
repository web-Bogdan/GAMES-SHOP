import {IAuthForm} from "../pages/Registration";
import {$authHost} from "./index";

export const UserApi = {
    signIn: async (data: IAuthForm) => {
        const body = {email: String(data.email), password: String(data.password), firstName: String(data.firstName), lastName: String(data.lastName)};
        const response = await $authHost.post("/email/register", body);
        return response;
    },
    logIn: async (data: IAuthForm) => {
        const body = {email: String(data.email), password: String(data.password)};
        const response = await $authHost.post("/email/login", body);
        return response;
    }
}


