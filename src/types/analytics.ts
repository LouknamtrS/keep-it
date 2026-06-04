export type SummaryPerCategory = {
    type: "income" | "expense";
    category: string;
    ratio: string;
    amount: number;
};

export type AnalyticsData = {
    categories: any;
    userId: string;
    totalIncome: number;
    totalExpense: number;
    summaryPerCategory: SummaryPerCategory[];
};

export type AnalyticsResponse = {
    message: string;
    data: AnalyticsData;
};