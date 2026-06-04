import axios from "axios";
import appConfig from "../config/config";

export const api = axios.create({
    baseURL: `${appConfig.backendBaseUrl}:8000`,
    withCredentials: true,
});