import { api } from "./axios";

export const categoryAPI = {
    async createCategory(data: {
        name: string;
        iconName: string;
        type: "income" | "expense";
    }) {
        return api.post(
            `/category/create`,
            data,
            { withCredentials: true }
        );
    },

    async getAll() {
        return api.get(
            `/category/all`,
            { withCredentials: true }
        )
    }
};