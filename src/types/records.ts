import type { Category } from "./category";

export type RecordFormData = {
    type: "income" | "expense";
    amount: string;
    description: string;
    date: string;
    time: string;
    category: Category | null;
};

export type RecordErrors = {
    amount: string;
    category: string;
    description: string;
};