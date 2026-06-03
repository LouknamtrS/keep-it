import type { Category } from "../types/category";

export const categoriesMock: Category[] = [
    // Income
    {
        id: 1,
        name: "เงินเดือน",
        icon: "💰",
        type: "income",
    },
    {
        id: 2,
        name: "โบนัส",
        icon: "🎁",
        type: "income",
    },
    {
        id: 3,
        name: "ดอกเบี้ย",
        icon: "🏦",
        type: "income",
    },
    {
        id: 4,
        name: "งานพิเศษ",
        icon: "💻",
        type: "income",
    },
    {
        id: 5,
        name: "ของขวัญ",
        icon: "🎉",
        type: "income",
    },

    // Expense
    {
        id: 6,
        name: "อาหาร",
        icon: "🍜",
        type: "expense",
    },
    {
        id: 7,
        name: "เดินทาง",
        icon: "🚌",
        type: "expense",
    },
    {
        id: 8,
        name: "ช้อปปิ้ง",
        icon: "🛍️",
        type: "expense",
    },
    {
        id: 9,
        name: "บันเทิง",
        icon: "🎮",
        type: "expense",
    },
    {
        id: 10,
        name: "ค่าสาธารณูปโภค",
        icon: "💡",
        type: "expense",
    },
];