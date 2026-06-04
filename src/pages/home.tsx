import { useMemo, useState } from "react";
import SummaryCard from "../components/analytics/summaryCard";
import Navbar from "../components/navbar";
import { mockRecords } from "../mocks/records";
import RecordCalendar from "../components/calendar/recordCalendar";
import DailyRecordPanel from "../components/rocords/dailyRecordPanel";
import TopCategory from "../components/rocords/topCategory";
import { useEffect } from "react"
import { recordAPI } from "../api/recordAPI"
import type { DailyRecordResponse, Record } from "../types/records"
import { analyticAPI } from "../api/analyticsAPI";
import type { Category } from "../types/category";
import { categoryAPI } from "../api/categoryAPI";

export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [records, setRecords] = useState<Record[]>([])
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [dailyRecords, setDailyRecords] = useState<DailyRecordResponse[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();


    // const topCategories = useMemo(() => {
    //     const categoryMap = new Map();

    //     monthlyRecords.forEach((record) => {
    //         const categoryId = record.category.id;

    //         const current = categoryMap.get(categoryId) || {
    //             id: categoryId,
    //             name: record.category.name,
    //             icon: record.category.iconName,
    //             type: record.category.type,
    //             total: 0,
    //             count: 0,
    //         };

    //         current.total += record.amount;
    //         current.count += 1;
    //         categoryMap.set(categoryId, current);
    //     });

    //     return Array.from(categoryMap.values()).sort((a, b) => b.total - a.total);
    // }, [monthlyRecords]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await recordAPI.getAll()
                setRecords(res.data.data)
            } catch (err) {
                console.error("failed to load records", err)
            }
        }

        fetchRecords()
    }, [])

    useEffect(() => {
        const fetchMonthlySummary = async () => {
            try {
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();

                const res =
                    await analyticAPI.getMonthlySummary(
                        month,
                        year
                    );

                setIncome(res.data.data.totalIncome);
                setExpense(res.data.data.totalExpense);

            } catch (err) {
                console.error(err);
            }
        };

        fetchMonthlySummary();
    }, [currentDate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const date =
                    `${selectedDate.getFullYear()}-${String(
                        selectedDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(
                        selectedDate.getDate()
                    ).padStart(2, "0")}`;
                const [
                    dailyRes,
                    categoryRes
                ] = await Promise.all([
                    analyticAPI.getDailyRecords(date),
                    categoryAPI.getAll()
                ]);

                setDailyRecords(
                    dailyRes.data.data.records
                );

                setCategories(
                    categoryRes.data.data
                );

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [selectedDate]);
    const categoryMap = useMemo(() => {
        return new Map(
            categories.map(category => [
                category.id,
                category
            ])
        );
    }, [categories]);
    const enrichedRecords = useMemo(() => {
        return dailyRecords.map(record => ({
            ...record,
            category: categoryMap.get(record.categoryId)
        }));
    }, [dailyRecords, categoryMap]);


    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row w-full lg:justify-between pt-6 px-4 lg:px-0 gap-12 justify-center">
                <div className="order-2 lg:order-1 w-full lg:w-3/5 flex justify-center">
                    <DailyRecordPanel 
                        records={enrichedRecords}
                        selectedDate={selectedDate}
                    />
                </div>
                <div className="order-1 lg:order-2 w-full lg:w-3/5 gap-6 flex flex-col px-6">
                    <div className="flex bg-white lg:shadow-sm lg:p-4 rounded-xl">
                        <SummaryCard
                            income={income}
                            expense={expense}
                        />
                    </div>
                    <RecordCalendar
                        records={records}
                        currentDate={currentDate}
                        onDateChange={setCurrentDate}
                        selectedDate={selectedDate}
                        onSelectedDateChange={
                            setSelectedDate
                        }
                    />
                </div>
                {/* <div className="order-3 lg:order-3 w-full lg:w-1/4 flex justify-center">
                    <TopCategory
                        categories={topCategories}
                    />
                </div> */}
            </div>
        </>
    );
}