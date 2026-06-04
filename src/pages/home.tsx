import { useMemo, useState, useCallback, useEffect } from "react";
import SummaryCard from "../components/analytics/summaryCard";
import Navbar from "../components/navbar";
import RecordCalendar from "../components/calendar/recordCalendar";
import DailyRecordPanel from "../components/rocords/dailyRecordPanel";
import { recordAPI } from "../api/recordAPI"
import type { EnrichedRecord, Record } from "../types/records"
import type { Category } from "../types/category";
import { categoryAPI } from "../api/categoryAPI";

export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [records, setRecords] = useState<Record[]>([])
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchRecords = useCallback(async () => {
        try {
            const res = await recordAPI.getAll()
            setRecords(res.data.data)
        } catch (err) {
            console.error("failed to load records", err)
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const res = await categoryAPI.getAll()
            setCategories(res.data.data)
        } catch (err) {
            console.error("failed to load categories", err)
        }
    }, []);

    useEffect(() => {
        fetchRecords();
        fetchCategories();
    }, [fetchRecords, fetchCategories]);

    const handleRecordAdded = () => {
        fetchRecords();
    };

    const handleCategoryAdded = (newCategory: Category) => {
        setCategories(prev => [...prev, newCategory]);
    };

    const categoryMap = useMemo(() => {
        return new Map(
            categories.map(category => [
                category.id,
                category
            ])
        );
    }, [categories]);

    const { income, expense } = useMemo(() => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        return records.reduce((acc, record) => {
            const date = new Date(record.date);
            if (date.getMonth() === month && date.getFullYear() === year) {
                if (record.type === "income") acc.income += record.amount;
                else acc.expense += record.amount;
            }
            return acc;
        }, { income: 0, expense: 0 });
    }, [records, currentDate]);

    const enrichedRecords = useMemo(() => {
        const selYear = selectedDate.getFullYear();
        const selMonth = selectedDate.getMonth();
        const selDay = selectedDate.getDate();

        return records
            .filter(record => {
                const date = new Date(record.date);
                return date.getFullYear() === selYear &&
                       date.getMonth() === selMonth &&
                       date.getDate() === selDay;
            })
            .map(record => ({
                ...record,
                // Ensure category is available, fallback to categoryMap if record doesn't have it joined
                category: record.category || categoryMap.get(Number((record as any).categoryId)),
                // Map description to note for DailyRecordPanel compatibility
                note: record.description || (record as any).note,
                categoryId: (record as any).categoryId || record.category?.id
            })) as EnrichedRecord[];
    }, [records, selectedDate, categoryMap]);

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
                        onRecordAdded={handleRecordAdded}
                        onCategoryAdded={handleCategoryAdded}
                    />
                </div>
            </div>
        </>
    );
}
