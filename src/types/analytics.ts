export type SummaryPerCategory = {
    type: "income" | "expense";
    category: string;
    ratio: string;
    amount: number;
};

export type AnalyticsData = {
    userId: string;
    month: number;
    year: number;
    totalIncome: number;
    totalExpense: number;
    summaryPerCategory: SummaryPerCategory[];
};

export type AnalyticsResponse = {
    message: string;
    data: AnalyticsData;
};


export type AnalyticsData2 = {
    userId: string;
    month: number;
    year: number;
    totalIncome: number;
    totalExpense: number;
    categories: SummaryPerCategory2[];
};

export type AnalyticsResponse2 = {
    message: string;
    data: AnalyticsData2;
};

export type SummaryPerCategory2 = {
    type: "income" | "expense";
    categoryId: number;
    ratio: string;
    amount: number;
};
