import type { AnalyticsResponse } from "../types/analytics";

export const analyticsMock: Record<
    string,
    AnalyticsResponse
> = {
    "2026-06": {
        message: "Get Daily Summarize",
        data: {
            userId: "1",
            totalIncome: 10000,
            totalExpense: 5600,
            summaryPerCategory: [
                {
                    type: "income",
                    category: "เงินเดือน",
                    ratio: "60",
                    amount: 6000,
                },
                {
                    type: "income",
                    category: "โบนัส",
                    ratio: "25",
                    amount: 2500,
                },
                {
                    type: "income",
                    category: "ดอกเบี้ย",
                    ratio: "15",
                    amount: 1500,
                },
                {
                    type: "expense",
                    category: "อาหาร",
                    ratio: "54",
                    amount: 3000,
                },
                {
                    type: "expense",
                    category: "เดินทาง",
                    ratio: "27",
                    amount: 1500,
                },
                {
                    type: "expense",
                    category: "บันเทิง",
                    ratio: "19",
                    amount: 1100,
                },
            ],
        },
    },

    "2026-05": {
        message: "Get Daily Summarize",
        data: {
            userId: "1",
            totalIncome: 8500,
            totalExpense: 4200,
            summaryPerCategory: [
                {
                    type: "income",
                    category: "เงินเดือน",
                    ratio: "70",
                    amount: 6000,
                },
                {
                    type: "income",
                    category: "ฟรีแลนซ์",
                    ratio: "30",
                    amount: 2500,
                },
                {
                    type: "expense",
                    category: "อาหาร",
                    ratio: "48",
                    amount: 2000,
                },
                {
                    type: "expense",
                    category: "เดินทาง",
                    ratio: "24",
                    amount: 1000,
                },
                {
                    type: "expense",
                    category: "ช้อปปิ้ง",
                    ratio: "28",
                    amount: 1200,
                },
            ],
        },
    },

    "2025-12": {
        message: "Get Daily Summarize",
        data: {
            userId: "1",
            totalIncome: 15000,
            totalExpense: 8000,
            summaryPerCategory: [
                {
                    type: "income",
                    category: "เงินเดือน",
                    ratio: "53",
                    amount: 8000,
                },
                {
                    type: "income",
                    category: "โบนัสสิ้นปี",
                    ratio: "47",
                    amount: 7000,
                },
                {
                    type: "expense",
                    category: "ท่องเที่ยว",
                    ratio: "50",
                    amount: 4000,
                },
                {
                    type: "expense",
                    category: "ของขวัญ",
                    ratio: "25",
                    amount: 2000,
                },
                {
                    type: "expense",
                    category: "อาหาร",
                    ratio: "25",
                    amount: 2000,
                },
            ],
        },
    },
};