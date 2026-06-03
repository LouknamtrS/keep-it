import { useMemo, useState } from "react";
import SummaryCard from "../components/analytics/summaryCard";
import Navbar from "../components/navbar";
import { mockRecords } from "../mocks/records";
import RecordCalendar from "../components/calendar/recordCalendar";
import DailyRecordPanel from "../components/rocords/dailyRecordPanel";
import TopCategory from "../components/rocords/topCategory";

export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthlyRecords =
        useMemo(() => {
            return mockRecords.filter(
                (record) => {
                    const recordDate = new Date(record.datetime);
                    return (recordDate.getFullYear() === year && recordDate.getMonth() === month);
                }
            );
        }, [year,month,]);

    const income =
        monthlyRecords
            .filter((record) => record.type === "income")
            .reduce((sum, record) => sum + record.amount, 0);

    const expense =
        monthlyRecords
            .filter((record) => record.type ===  "expense")
            .reduce((sum, record) => sum + record.amount, 0);

    const topCategories = useMemo(() => {
        const categoryMap = new Map();

        monthlyRecords.forEach((record) => {
            const categoryId = record.category.id;

            const current = categoryMap.get(categoryId) || {
                id: categoryId,
                name: record.category.name,
                icon: record.category.iconName,
                type: record.category.type,
                total: 0,
                count: 0,
            };

            current.total += record.amount;
            current.count += 1;
            categoryMap.set(categoryId, current);
        });

        return Array.from(categoryMap.values()).sort((a, b) => b.total - a.total);
    }, [monthlyRecords]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row w-full lg:justify-between pt-6 px-4 lg:px-0 gap-12 justify-center">
                <div className="order-2 lg:order-1 w-full lg:w-1/4 flex justify-center">
                    <DailyRecordPanel 
                        records={mockRecords}
                        selectedDate={selectedDate}
                    />
                </div>
                <div className="order-1 lg:order-2 w-full lg:w-2/4 gap-6 flex flex-col">
                    <div className="flex bg-white lg:shadow-sm lg:p-4 rounded-xl">
                        <SummaryCard
                            income={income}
                            expense={expense}
                        />
                    </div>
                    <RecordCalendar
                        records={mockRecords}
                        currentDate={currentDate}
                        onDateChange={setCurrentDate}
                        selectedDate={selectedDate}
                        onSelectedDateChange={
                            setSelectedDate
                        }
                    />
                </div>
                <div className="order-3 lg:order-3 w-full lg:w-1/4 flex justify-center">
                    <TopCategory
                        categories={topCategories}
                    />
                </div>
            </div>
        </>
    );
}