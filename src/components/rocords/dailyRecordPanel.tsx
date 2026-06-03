import { useMemo, useState } from "react";
import type { Record } from "../../types/records";
import CustomDropdown from "../calendar/customDropdown";

type Props = {
    records: Record[];
    selectedDate: Date;
};

export default function DailyRecordPanel({
    records,
    selectedDate,
}: Props) {
    const [typeFilter, setTypeFilter] = useState("ทั้งหมด");
    const [categoryFilter, setCategoryFilter] =useState("หมวดหมู่");
    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    const dayRecords = useMemo(() => {
        return records.filter((record) => {
            const recordDate = record.datetime.split("T")[0];
            const matchDate = recordDate === dateKey;
            const matchType = typeFilter === "ทั้งหมด"
                    ? true
                    : typeFilter === "รายรับ"
                    ? record.type === "income"
                    : record.type === "expense";
            const matchCategory = categoryFilter === "หมวดหมู่"
                    ? true
                    : record.category.name ===
                      categoryFilter;

            return (
                matchDate &&
                matchType &&
                matchCategory
            );
        });
    }, [records, dateKey, typeFilter, categoryFilter,
    ]);

    const categories = [
        "หมวดหมู่",
        ...new Set(
            records.map(
                (record) =>
                    record.category.name
            )
        ),
    ];

    const typeOptions = [
        {
            label: "ทั้งหมด",
            value: "ทั้งหมด",
        },
        {
            label: "รายรับ",
            value: "รายรับ",
        },
        {
            label: "รายจ่าย",
            value: "รายจ่าย",
        },
    ];

    const categoryOptions =
        categories.map((category) => ({
            label: category,
            value: category,
        }));

    return (
        <div className="bg-white rounded-2xl p-4">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-2">
                <p className="text-sm text-gray-30">
                    รายการวันที่
                </p>
                <h2 className="text-gray-50 text-4xl font-semibold">
                    {selectedDate.getDate()}
                </h2>

                <p className="text-gray-50 text-xl">
                    {selectedDate.toLocaleDateString("th-TH",{month: "long", year: "numeric",})}
                </p>
            </div>

            {/* Filters */}
            <div className="flex w-full gap-2 mb-4">
                <CustomDropdown
                    value={typeFilter}
                    options={typeOptions}
                    onChange={setTypeFilter}
                />

                <CustomDropdown
                    value={categoryFilter}
                    options={categoryOptions}
                    onChange={setCategoryFilter}
                />
            </div>

            {/* Records */}
            <div className="flex flex-col gap-2 w-full lg:max-w-56 max-h-64 lg:max-h-125 overflow-y-scroll">
                {dayRecords.length === 0 ? (
                    <p className="text-gray-400 text-sm lg:text-base">
                        ไม่มีรายการ
                    </p>
                ) : (
                    dayRecords.map(
                        (record) => (
                            <div
                                key={record.id}
                                className={`flex justify-between items-center rounded-xl p-3 w-68 lg:w-56 ${record.type == "income" ? "bg-success-10" : "bg-error-10"}`}
                            >
                                <div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="font-medium text-sm">
                                            {record.category.iconName}
                                        </p>
                                        <p className="text-sm text-left font-medium max-w-24 w-24 wrap-break-word line-clamp-2 text-ellipsis">
                                            {record.category.name}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-40 text-left max-w-24 w-24 wrap-break-word line-clamp-2 text-ellipsis">
                                        {record.description}
                                    </p>
                                </div>
                                <span
                                    className={record.type === "income" ? "text-success-50" : "text-error-50"}
                                >
                                    {record.type === "income" ? "+" : "-"}
                                    {record.amount.toLocaleString()}
                                </span>
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
}