import Navbar from "../components/navbar";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { AnalyticsData, AnalyticsData2, AnalyticsResponse } from "../types/analytics";
import { analyticsApi } from "../api/analyticsAPI";
import { getNextMonth, getPrevMonth } from "../utils/date";
import AnalyticsHeader from "../components/analytics/analyticsHeader";
import SummaryCards from "../components/analytics/summaryCard";
import AnalyticsChart from "../components/analytics/analyticsChart";
import AnalyticsTable from "../components/analytics/analyticsTable";
import { categoryAPI } from "../api/categoryAPI";


export default function Analytics() {

    const [activeTab, setActiveTab] = useState<"income" | "expense">("income");
    const [searchParams] = useSearchParams();
    const [monthlySummary, setMonthlySummary] = useState<AnalyticsData2 | null>(null);
    const [categoryData, setCategoryData] = useState<{ id: number; name: string }[] | null>([] as any);

    const [month, setMonth] = useState(
        Number(searchParams.get("month")) ||
        new Date().getMonth() + 1
    );

    const [year, setYear] = useState(
        Number(searchParams.get("year")) ||
        new Date().getFullYear()
    );

    const userId = "james11111111";

    useEffect(() => {
        const fetchMonthlySummary = async () => {
            try {
                const result = await analyticsApi.getMonthlySummary(
                    userId,
                    month,
                    year
                );

                setMonthlySummary(result.data);
            } catch (err) {
                console.error("Get monthly summary failed:", err);
                setMonthlySummary(null);
            }
        };

        fetchMonthlySummary();
    }, [userId, month, year]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await categoryAPI.getAllCategories();

                setCategoryData(categories.data.data);
            } catch (err) {
                console.error("Get categories failed:", err);
                setCategoryData([]);
            }
        };

        fetchCategories();
    }, []);

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
        const categoryNameMap = new Map(
            categoryData?.map((category) => [category.id, category.name]) ?? []
        );

        return monthlySummary?.categories
            ?.filter((item) => item.type === activeTab)
            .map((item) => ({
                name: categoryNameMap.get(item.categoryId) ?? "ไม่พบหมวดหมู่",
                value: item.amount,
            })) ?? [];
    }, [monthlySummary, categoryData, activeTab]);

    const hasData = !!monthlySummary && monthlySummary.categories.length > 0;

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
                        {!hasData ? (
                            <div className="flex flex-col items-center gap-4 py-16">
                                <i className="bi bi-emoji-frown text-4xl text-gray-20"></i>
                                <p className="text-sm text-gray-500">ไม่มีข้อมูลในเดือนนี้</p>
                            </div>
                        )
                            : (
                                <>
                                    <SummaryCards
                                        income={monthlySummary?.totalIncome ?? 0}
                                        expense={monthlySummary?.totalExpense ?? 0}
                                    />
                                    <div className="flex flex-col items-center gap-6 bg-white rounded-2xl border border-gray-10 w-full mx-auto p-4">
                                        <div className="flex bg-primary-10 rounded-xl p-1 w-full">
                                            <button
                                                onClick={() => setActiveTab("income")}
                                                className={`flex-1 py-2 rounded-lg transition cursor-pointer ${activeTab === "income"
                                                    ? "bg-primary-30 shadow text-gray-50"
                                                    : "text-gray-20"
                                                    }`}
                                            >
                                                รายรับ
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("expense")}
                                                className={`flex-1 py-2 rounded-lg transition cursor-pointer ${activeTab === "expense"
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
                                                totalIncome={monthlySummary?.totalIncome ?? 0}
                                                totalExpense={monthlySummary?.totalExpense ?? 0}
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
                        totalIncome={monthlySummary?.totalIncome ?? 0}
                        totalExpense={monthlySummary?.totalExpense ?? 0}
                        hasData={hasData}
                        activeTab={activeTab}
                    />
                </div>
            </div>
        </>
    );
}