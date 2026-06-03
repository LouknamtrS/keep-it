import type { Category } from "./category";

export type RecordFormData = {
    type: "income" | "expense";
    amount: string;
    description: string;
    date: string;
    category: Category | null;
};

export type RecordErrors = {
    amount: string;
    category: string;
    description: string;
};

export type Record = {
    date: string | number | Date;
    id: string;
    type: "income" | "expense";
    amount: number;
    description: string;
    category: Category;
};