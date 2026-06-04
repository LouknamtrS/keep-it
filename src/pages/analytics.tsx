import Navbar from "../components/navbar";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { AnalyticsResponse } from "../types/analytics";
import { analyticAPI } from "../api/analyticsAPI";
import { getNextMonth, getPrevMonth} from "../utils/date";
import AnalyticsHeader from "../components/analytics/analyticsHeader";
import SummaryCards from "../components/analytics/summaryCard";
import AnalyticsChart from "../components/analytics/analyticsChart";
import AnalyticsTable from "../components/analytics/analyticsTable";
import type { Category } from "../types/category";
import { categoryAPI } from "../api/categoryAPI";

export default function Analytics() {

    const [activeTab, setActiveTab] = useState<"income" | "expense">("income");
    const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchParams] = useSearchParams();
    

    const [month, setMonth] = useState(
        Number(searchParams.get("month")) ||
        new Date().getMonth() + 1
    );

    const [year, setYear] = useState(
        Number(searchParams.get("year")) ||
        new Date().getFullYear()
    );

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res =
                    await analyticAPI.getMonthlySummary(
                        month,
                        year
                    );

                setAnalytics(res.data);
            } catch (err) {
                console.error(err);
                setAnalytics(null);
            }
        };

        fetchAnalytics();
    }, [month, year]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res =
                    await categoryAPI.getAll();

                setCategories(
                    res.data.data
                );
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    const categoryMap = useMemo(() => {
        return new Map(
            categories.map(category => [
                Number(category.id),
                category
            ])
        );
    }, [categories]);

    const handlePrevMonth = () => {
        const result = getPrevMonth(
            month,
            year
        );

        setMonth(result.month);
        setYear(result.year);
    };

    const handleNextMonth = () => {
        const result = getNextMonth(
            month,
            year
        );

        setMonth(result.month);
        setYear(result.year);
    };

    const chartData = useMemo(() => {
        if (!analytics) return [];

        return analytics.data.categories
            .filter((item: { type: string; }) =>
                item.type === activeTab
            )
            .map((item: { categoryId: number; amount: any; ratio: any; }) => {
                const category = categoryMap.get(Number(item.categoryId));

            return {
                categoryId: item.categoryId,
                name: category?.name ?? "Unknown",
                icon: category?.iconName ?? "❓",
                value: item.amount,
                ratio: item.ratio,
            };
            })
            .sort(
                (a: { value: number; }, b: { value: number; }) =>
                    b.value - a.value
            );
    }, [
        analytics,
        activeTab,
        categoryMap
    ]);

    const total = useMemo(
    () =>
        chartData.reduce(
        (sum: any, item: { value: any; }) => sum + item.value,0),
        [chartData]
    );

    const hasData = !!analytics && analytics.data.categories.length > 0;

    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row w-screen h-screen items-center justify-start mt-8">
                <div className="flex lg:w-5/8 w-full h-full items-start justify-center">
                    <div className="flex flex-col items-center gap-6 pt-8 px-6 lg:px-12 pb-8 bg-white rounded-2xl shadow-none lg:shadow-sm lg:border lg:border-gray-100 border-none w-11/12 max-w-xl mx-auto ">
                        <AnalyticsHeader
                            month={month}
                            year={year}
                            onPrev={handlePrevMonth}
                            onNext={handleNextMonth}
                        />
                        {!hasData ?(
                            <div className="flex flex-col items-center gap-4 py-16">
                                <i className="bi bi-emoji-frown text-4xl text-gray-20"></i>
                                <p className="text-sm text-gray-500">ไม่มีข้อมูลในเดือนนี้</p>
                            </div>
                        )
                        :(
                        <>
                            <SummaryCards
                                income={analytics?.data.totalIncome ?? 0}
                                expense={analytics?.data.totalExpense ?? 0}
                            />
                            <div className="flex flex-col items-center gap-6 bg-white rounded-2xl border border-gray-10 w-full mx-auto p-4">
                                <div className="flex bg-primary-10 rounded-xl p-1 w-full">
                                    <button
                                        onClick={() => setActiveTab("income")}
                                        className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
                                            activeTab === "income"
                                                ? "bg-primary-30 shadow text-gray-50"
                                                : "text-gray-20"
                                        }`}
                                    >
                                        รายรับ
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("expense")}
                                        className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
                                            activeTab === "expense"
                                                ? "bg-primary-30 shadow text-gray-50"
                                                : "text-gray-20"
                                        }`}
                                    >
                                        รายจ่าย
                                    </button>
                                </div>
                                <div className="w-full h-80 relative">
                                    <AnalyticsChart
                                        chartData={chartData}
                                        total={total}
                                        activeTab={activeTab}
                                    />
                                </div>
                            </div>
                        </>
                        )}
                    </div>
                </div>
                <div className="flex lg:w-3/8 w-full h-full items-start justify-center">
                    <AnalyticsTable
                        chartData={chartData}
                        total={total}
                        hasData={hasData}
                    />
                </div>
            </div>
        </>
    );
}