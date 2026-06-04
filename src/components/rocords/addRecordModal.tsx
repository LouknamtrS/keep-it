import { useEffect, useState } from "react";
import type { Category } from "../../types/category";
import type {RecordFormData,RecordErrors, Record} from "../../types/records";
import PrimaryButton from "../primaryButton";
import CategoryForm from "../category/categoryForm";
import RecordForm from "./recordForm";
import { validateRecord } from "../../utils/validateRecord";
import { recordAPI } from "../../api/recordAPI";
import { categoryAPI } from "../../api/categoryAPI"

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAddCategory: (category: Category) => void;
    onSuccess?: () => void;
};

export default function AddRecordModal({
    isOpen,
    onClose,
    onAddCategory,
    onSuccess,
}: Props) {
   
    const [view, setView] = useState<"record" | "category">("record");
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

    const createInitialFormData = () => ({
        type: "income" as const,
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        category: null as Category | null,
    });
    const [formData, setFormData] =
        useState<RecordFormData>(
            createInitialFormData()
        );

    const [errors, setErrors] =
        useState<RecordErrors>({
            amount: "",
            category: "",
            description: "",
        });

    if (!isOpen) return null;

    if (view === "category") {
        return (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                    <CategoryForm
                        onBack={() => setView("record")}
                        onCreateCategory={(newCategory) => {
                            setCategories(prev => [...prev, newCategory]);
                            onAddCategory(newCategory);
                            setFormData(prev => ({
                                ...prev,
                                category: newCategory
                            }));
                            setView("record");
                        }}
                    />
                </div>
            </div>
        );
    }
    const recordDate = formData.date

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const validationErrors =
            validateRecord(formData);

        setErrors(validationErrors);

        const hasError =
            Object.values(validationErrors)
                .some(Boolean);

        if (hasError) return;

        try {
            if (formData.type === "income") {
                await recordAPI.createIncome({
                    categoryId:
                        formData.category!.id,
                    amount:
                        Number(formData.amount),
                    date: recordDate,
                    note:
                        formData.description,
                });
            } else {
                await recordAPI.createExpense({
                    categoryId:
                        formData.category!.id,
                    amount:
                        Number(formData.amount),
                    date: recordDate,
                    note:
                        formData.description,
                });
            }

            if (onSuccess) {
                onSuccess();
            }
            handleClose();
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถบันทึกรายการได้");
        }
    };

    const resetForm = () => {
        setFormData(createInitialFormData());
    };

    const handleClose = () => {
        resetForm();
        setView("record");
        onClose();
    };
    
    return (
        <form className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl text-gray-800">
                            เพิ่มบันทึก
                        </h2>
                        <button onClick={handleClose} className="cursor-pointer">
                            <i className="bi bi-x-lg text-lg"></i>
                        </button>
                    </div>
                    <RecordForm
                        formData={formData}
                        errors={errors}
                        categories={categories}
                        onChange={setFormData}
                        onCreateCategory={() =>
                            setView("category")
                        }
                    />
                    <PrimaryButton>
                        บันทึก
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
}
