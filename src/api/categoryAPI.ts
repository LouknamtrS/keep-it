import axios from "axios";
import appConfig from "../config/config";
import { api } from "./axios";

export const categoryAPI = {
    async createCategory(data: {
        name: string;
        iconName: string;
        type: "income" | "expense";
    }) {
        return axios.post(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.category}/create`,
            data,
            { withCredentials: true }
        );
    },

    async getAll() {
        return axios.get(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.category}/all`,
            { withCredentials: true }
        );
    },

    async getAllCategories() {
        return api.get(
            `/category/all`,
            { withCredentials: true }
        );
    }
};