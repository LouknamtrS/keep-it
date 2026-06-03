import { useState } from "react";
import AddRecordModal from "../components/rocords/addRecordModal";
import {categoriesMock} from "../mocks/category";
import type { Category } from "../types/category";
export default function HomeTest() {
    const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
    const [categories, setCategories] =
        useState(categoriesMock);

    const handleAddCategory = (
        newCategory: Category
    ) => {
        setCategories(prev => [
            ...prev,
            newCategory,
        ]);
    };

    return (
        <div className="flex flex-col w-full gap-8">
            <button onClick={() => setIsAddRecordOpen(true)}>
                เพิ่มรายการ
            </button>

            <AddRecordModal
                categories={categories}
                isOpen={isAddRecordOpen}
                onClose={() =>
                    setIsAddRecordOpen(false)
                }
                onAddCategory={handleAddCategory}
            />
        </div>
    );
}