import { api } from "./axios";

export const recordAPI = {
    async createIncome(data: {
        categoryId: number;
        amount: number;
        date: string;
        note: string;
    }) {
        return api.post(
            `/income-expense/create`,
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
        return api.post(
            `/income-expense/create`,
            data,
            {
                withCredentials: true,
            }
        );
    },
    async getAll() {
        return api.get(
            `/income-expense/all`,
            {
                withCredentials: true,
            }
        );
    }
};