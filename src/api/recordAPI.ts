import axios from "axios";
import appConfig from "../config/config";
import { firebaseClientAuth } from "../config/firebaseClientConfig";

export const recordAPI = {
    async createIncome(data: {
        categoryId: number;
        amount: number;
        date: string;
        note: string;
    }) {
        return axios.post(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.incomeExpense}/create-income`,
            data,
            {
                withCredentials: true,
            }
        );
    },

    async createExpense(data: {
        categoryId: number;
        amount: number;
        date: string;
        note: string;
    }) {
        return axios.post(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.incomeExpense}/create-expense`,
            data,
            {
                withCredentials: true,
            }
        );
    },
    async getAll() {
        return axios.get(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.incomeExpense}/all`,
            {
                withCredentials: true,
            }
        );
    }
};