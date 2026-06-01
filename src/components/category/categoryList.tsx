import { useState } from "react";
import PrimaryButton from "../primaryButton";
import type { Category } from "../../type/category";

type Props = {
    categories: Category[];
    onCreate: () => void;
    onClose: () => void;
};

export default function CategoryList({
    categories,
    onCreate,
    onClose,
}: Props) {
    const [activeTab, setActiveTab] = useState<"income" | "expense">("income");
    const filteredCategories = categories.filter(category => category.type === activeTab);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-800">
                    หมวดหมู่
                </h2>
                <button onClick={onClose} className="cursor-pointer">
                    <i className="bi bi-x-lg text-lg"></i>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-primary-10 rounded-xl p-1">
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

            {/* Category Grid */}
            <div className="grid grid-cols-3 gap-4 bg-highlight-10 rounded-xl p-8 max-h-96 overflow-scroll">
                    {filteredCategories.map((category) => (
                    <button
                        key={category.id}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className={`w-16 h-16 rounded-full ${category.type === "income" ? "bg-success-10 text-success-50" : "bg-error-20 text-error-50"} flex items-center justify-center text-4xl`}>
                           {category.icon}
                        </div>

                        <span className="text-sm text-center text-wrap w-20 line-clamp-2 text-ellipsis">
                            {category.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Create Button */}
            <PrimaryButton onClick={onCreate}>
                + สร้างหมวดหมู่ใหม่
            </PrimaryButton>
        </div>
    );
}