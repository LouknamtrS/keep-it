import axios from "axios";
import appConfig from "../config/config";

export const analyticAPI = {
    async getMonthlySummary(
        month: number,
        year: number
    ) {
        return axios.get(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.analytic}/monthly-summary/${month}/${year}`,
            { withCredentials: true }
        );
    },

    async getDailyRecords(
        date: string
    ) {
        return axios.get(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.analytic}/daily-records/${date}`,
            { withCredentials: true }
        );
    },

    async getCalendar(
        month: number,
        year: number
    ) {
        return axios.get(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.analytic}/calendar/${month}/${year}`,
            { withCredentials: true }
        );
    }
};