import { useMemo, useState } from "react";
import type { Record } from "../../types/records";
import type { Category } from "../../types/category";
import AddRecordModal from "../rocords/addRecordModal";
import PrimaryButtonSmall from "../primaryButtonSmall";
import CustomDropdown from "./customDropdown";
import { useNavigate } from "react-router-dom";

type Props = {
    records: Record[];
    currentDate: Date;
    onDateChange: (
        date: Date
    ) => void;
    selectedDate: Date;
    onSelectedDateChange:(
        date: Date
    ) => void;
    onRecordAdded?: () => void;
    onCategoryAdded?: (category: Category) => void;
};

export default function RecordCalendar({
    records,
    currentDate,
    onDateChange,
    selectedDate,
    onSelectedDateChange,
    onRecordAdded,
    onCategoryAdded
}: Props) {
    const navigate = useNavigate();
    const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
    const [, setCategories] = useState<Category[]>([]);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    const daysInMonth = lastDay.getDate();
    const startWeekday = firstDay.getDay();

    const handleAddCategory = (
        newCategory: Category
    ) => {
        setCategories((prev: any) => [
            ...prev,
            newCategory,
        ]);
        if (onCategoryAdded) {
            onCategoryAdded(newCategory);
        }
    };

    const dailySummary =
        useMemo(() => {
            const map = new Map();
            records.forEach((record) => {
                const recordDate = new Date(record.date);
                const date =`${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, "0")}-${String(recordDate.getDate()).padStart(2, "0")}`;
                const current = map.get(date) || {income: 0, expense: 0,};
                if (record.type === "income") {
                    current.income += record.amount;
                }else {
                    current.expense += record.amount;
                }
                map.set(date, current);
            });
            return map;
        }, [records]);

    const days: (number | null)[] = [];

    for (let i = 0; i < startWeekday; i++) {
        days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }
    while (days.length < 42) {
        days.push(null);
    }

    const months = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
    ];

    const years = useMemo(() => {
        const uniqueYears = new Set<number>();
        records.forEach((record) => {uniqueYears.add(new Date(record.date).getFullYear());});
        if (uniqueYears.size === 0) {uniqueYears.add(new Date().getFullYear());}
        return Array.from(uniqueYears).sort((a, b) => a - b);
    }, [records]);

    const monthOptions = months.map(
        (month, index) => ({
            label: month,
            value: index,
        })
    );

    const yearOptions = years.map(
        (year) => ({
            label: String(year),
            value: year,
        })
    )

    const todayKey =`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const selectedDateKey =`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    return (
        <div className="bg-white w-full">
            <div className="flex flex-row w-full justify-between">
                <h2 className="text-xl w-1/3 text-left">ปฏิทิน</h2>
                <div className="flex flex-row gap-2 w-2/4">
                    <PrimaryButtonSmall onClick={() => setIsAddRecordOpen(true)}>
                        เพิ่มรายการ
                    </PrimaryButtonSmall>
                    <PrimaryButtonSmall
                        onClick={() => navigate( `/analytics?month=${month + 1}&year=${year}`, {
                            state: {
                                month: month + 1,
                                year,
                            },
                        })}
                        > วิเคราะห์
                    </PrimaryButtonSmall>
                </div>

                <AddRecordModal
                    isOpen={isAddRecordOpen}
                    onClose={() =>
                        setIsAddRecordOpen(false)
                    }
                    onAddCategory={handleAddCategory}
                    onSuccess={onRecordAdded}
                />
            </div>
            
            <div className="bg-white lg:shadow-sm rounded-2xl lg:p-4 py-4 mt-2">
               
                {/* Header */}
                <div className="flex justify-between items-center mb-4">

                    {/* Previous */}
                    <button type="button" onClick={() =>onDateChange(new Date(year, month - 1, 1))} className="w-9 h-9 rounded-full hover:bg-gray-100 cursor-pointer">
                        <i className="bi bi-chevron-left text-2xl text-primary-70"></i>
                    </button>
                    {/* Month + Year Dropdown */}
                    <div className="flex gap-1 lg:gap-2">
                        <CustomDropdown
                            value={month}
                            options={monthOptions}
                            onChange={(selectedMonth) => onDateChange(new Date(year, selectedMonth, 1))}
                        />
                        <CustomDropdown
                            value={year}
                            options={yearOptions}
                            onChange={(selectedYear) =>onDateChange(new Date(selectedYear, month, 1))}
                        />
                        <button 
                            type="button"
                            onClick={() => {const today = new Date();
                                onDateChange(today);
                                onSelectedDateChange(today);
                            }}
                            className="bg-primary-30 px-2 min-w-12 rounded-xl cursor-pointer hover:bg-primary-50">
                            วันนี้
                        </button>
                    </div>

                    {/* Next */}
                    <button type="button" onClick={() =>onDateChange(new Date(year, month + 1, 1))} className="w-9 h-9 rounded-full hover:bg-gray-100 cursor-pointer">
                        <i className="bi bi-chevron-right text-2xl text-primary-70"></i>
                    </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 text-center mb-2">
                    <div>อา</div>
                    <div>จ</div>
                    <div>อ</div>
                    <div>พ</div>
                    <div>พฤ</div>
                    <div>ศ</div>
                    <div>ส</div>
                </div>

                {/* Calendar */}
                <div className="grid grid-cols-7 lg:gap-2 gap-1">
                    {days.map(
                        (day, index) => {
                            if (!day) {
                                return (
                                    <div key={index} className="lg:h-16 h-12 overflow-hidden"/>
                                );
                            }

                            const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const summary = dailySummary.get(dateKey);
                            const isToday = dateKey === todayKey;
                            const isSelected = dateKey === selectedDateKey;

                            return (
                                <div key={`${year}-${month}-${index}`}
                                    onClick={() =>
                                        onSelectedDateChange(new Date(year, month, day))
                                    }
                                    className={`lg:h-16 h-12 overflow-hidden rounded-xl p-1 flex flex-col text-[8px] lg:text-xs cursor-pointer transition ${isSelected? "bg-highlight-50" : isToday ?  "bg-secondary-40" : "bg-secondary-20 hover:bg-secondary-40"}`}>
                                    <span className="font-medium"> {day} </span>
                                    {summary && (
                                        <>
                                            {summary.income > 0 && (
                                                <span className="text-success-50 font-medium"> + {summary.income.toLocaleString()} </span>
                                            )}
                                            {summary.expense > 0 && (
                                                <span className="text-error-50 font-medium"> - {summary.expense.toLocaleString()} </span>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
}
