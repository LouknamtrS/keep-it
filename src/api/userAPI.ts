import { api } from "./axios";

export const userAPI = {
    async updateProfile(formData: FormData) {
        return api.put(
            `/user/profile/update`,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },

    async getProfile() {
        return api.get(
            `/user/profile`,
            {
                withCredentials: true,
            }
        );
    },
};