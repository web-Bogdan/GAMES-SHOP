import axios from "axios";
import {AUTH_API_URL} from "../utils/consts/consts";

export const $authHost = axios.create({
    baseURL: AUTH_API_URL
});

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);
