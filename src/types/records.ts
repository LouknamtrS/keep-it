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
    categoryId(categoryId: any): Category | undefined;
    date: string | number | Date;
    id: string;
    type: "income" | "expense";
    amount: number;
    description: string;
    category: Category;
};

export type DailyRecordResponse = {
    id: number;
    categoryId: number;
    amount: number;
    note: string;
    type: "income" | "expense";
}

export type EnrichedRecord = {
    id: number;
    categoryId: number;
    amount: number;
    note: string;
    type: "income" | "expense";
    date: string;
    description: string;
    category?: Category;
};