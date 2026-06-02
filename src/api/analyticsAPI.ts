import { analyticsMock } from "../mocks/analytics";

export const analyticsApi = {
    getSummary: async (
        userId: string,
        month: number,
        year: number
    ) => {

        await new Promise(
            resolve =>
                setTimeout(resolve, 500)
        );

        const key =
            `${year}-${String(month).padStart(2, "0")}`;

        const data =
            analyticsMock[key];

        return {
            data: data ?? null,
        };
        // return axios.get(
        //     "/analytics",
        //     {
        //         params: {
        //             userId,
        //             month,
        //             year,
        //         },
        //     }
        // );
    },
};