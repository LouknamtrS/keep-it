import axios from "axios";
import appConfig from "../config/config";

export const userAPI = {
    async updateProfile(formData: FormData) {
        return axios.put(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.user}/profile/update`,
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
        return axios.get(
            `${appConfig.backendBaseUrl}:${appConfig.backendPort.user}/profile`,
            {
                withCredentials: true,
            }
        );
    },
};