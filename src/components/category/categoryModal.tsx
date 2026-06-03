import { useState } from "react";
import CategoryList from "./categoryList";
import CategoryForm from "./categoryForm";
import type { Category } from "../../types/category";
import { useEffect } from "react"
import { categoryAPI } from "../../api/categoryAPI"

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CategoryModal({
    isOpen,
    onClose
}: Props) {

    const [currentView, setCurrentView] = useState<"list" | "create">("list");

    const [categories, setCategories] = useState<Category[]>([])
        useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await categoryAPI.getAll()
                setCategories(res.data.data)
            } catch (err) {
                console.error("failed to load categories", err)
            }
        }

        if (isOpen) {
            fetchCategories()
        }
    }, [isOpen])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">

                {currentView === "list" && (
                    <CategoryList
                        categories={categories}
                        onCreate={() => setCurrentView("create")}
                        onClose={onClose}
                    />
                )}

                {currentView === "create" && (
                    <CategoryForm
                        onBack={() => setCurrentView("list")}
                        onCreateCategory={(newCategory) => {
                            setCategories(prev => [
                                ...prev,
                                newCategory
                            ]);
                            setCurrentView("list");
                        }}
                    
                    />
                )}
            </div>
        </div>
    );
}