import { useState } from "react";
import type { Category } from "../../types/category";
import type {RecordFormData,RecordErrors} from "../../types/records";
import PrimaryButton from "../primaryButton";
import CategoryForm from "../category/categoryForm";
import RecordForm from "./recordForm";
import { validateRecord } from "../../utils/validateRecord";

type Props = {
    categories: Category[];
    isOpen: boolean;
    onClose: () => void;
    onAddCategory: (category: Category) => void;
};

export default function AddRecordModal({
    categories,
    isOpen,
    onClose,
    onAddCategory,
}: Props) {
   
    const [view, setView] = useState<"record" | "category">("record");

    const createInitialFormData = () => ({
        type: "income" as const,
        amount: "",
        description: "",
        date: new Date()
            .toISOString()
            .split("T")[0],
        time: new Date()
            .toTimeString()
            .slice(0, 5),
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
    const recordDateTime = `${formData.date}T${formData.time}:00`;

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const validationErrors = validateRecord(formData);

        setErrors(validationErrors);

        const hasError = Object.values(
            validationErrors
        ).some(Boolean);

        if (hasError) return;

        const newRecord = {
            type: formData.type,
            amount: Number(formData.amount),
            categoryId: formData.category?.id,
            description: formData.description,
            datetime: recordDateTime,
        };

        console.log(newRecord);

        handleClose();
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