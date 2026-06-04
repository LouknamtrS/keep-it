import { api } from "./axios";

export const analyticsApi = {
    getMonthlySummary: async (
        userId: string,
        month: number,
        year: number
    ) => {
        const res = await api.get(`/analytic/monthly-summary/${userId}/${month}/${year}`);

        const result = {
            ...res.data,
            data: {
                ...res.data.data,
                month: Number(res.data.data.month),
                year: Number(res.data.data.year),
            },
        };

        return result;
    },
    getCalendar: async (
        userId: string,
        month: number,
        year: number
    ) => {
        const res = await api.get(`/analytic/calendar/${userId}/${month}/${year}`);

        return res.data;
    },
    getDailySummary: async (
        userId: string,
        date: string
    ) => {
        const res = await api.get(`/analytic/daily-records/${userId}/${date}`);

        return res.data;
    },
};