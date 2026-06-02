import Navbar from "../components/navbar";
import { useState, useEffect, useMemo } from "react";
import type { AnalyticsResponse } from "../types/analytics";
import { analyticsApi } from "../api/analyticsAPI";
import { getNextMonth, getPrevMonth} from "../utils/date";
import AnalyticsHeader from "../components/analytics/analyticsHeader";
import SummaryCards from "../components/analytics/summaryCard";
import AnalyticsChart from "../components/analytics/analyticsChart";
import AnalyticsTable from "../components/analytics/analyticsTable";

export default function Analytics() {

    const [activeTab, setActiveTab] = useState<"income" | "expense">("income");
    const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
    const [month, setMonth] =useState(6);
    const [year, setYear] =useState(2026);
    //รอทำหน้า home เด่วมาแก้ init month, year เป็นเดือนที่เลือกในหน้า home

    useEffect(() => {
        fetchAnalytics();
    }, [month, year]);

    const fetchAnalytics = async () => {
        try {
            const response =
                await analyticsApi.getSummary(
                    "1",
                    month,
                    year
                );

            setAnalytics(response.data ?? null);

        } catch (error) {
            console.error(error);
            setAnalytics(null);
        }
    };
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
    return (
        analytics?.data.summaryPerCategory
        .filter(item => item.type === activeTab)
        .map(item => ({
            name: item.category,
            value: item.amount,
        })).sort((a, b) => b.value - a.value) ?? []
    );
    }, [analytics, activeTab]);

    const total = useMemo(
    () =>
        chartData.reduce(
        (sum, item) => sum + item.value,0),
        [chartData]
    );

    const hasData = !!analytics && analytics.data.summaryPerCategory.length > 0;

    return (
        <>
            <Navbar />
            <div className="flex flex-col sm:flex-row w-screen h-screen items-center justify-start mt-8">
                <div className="flex sm:w-5/8 w-full h-full items-start justify-center">
                    <div className="flex flex-col items-center gap-6 pt-8 px-6 sm:px-12 pb-8 bg-white rounded-2xl shadow-none sm:shadow-sm sm:border sm:border-gray-100 border-none w-11/12 max-w-xl mx-auto ">
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
                <div className="flex sm:w-3/8 w-full h-full items-start justify-center">
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