import { useState } from "react";
import PrimaryButton from "../primaryButton";
import EmojiPicker from "emoji-picker-react";
import type { Category } from "../../types/category";

type Props = {
    onBack: () => void;
    onCreateCategory: (
        category: Category
    ) => void;
};
export default function CategoryForm({
    onBack,
    onCreateCategory
}: Props) {
    const [name, setName] = useState("");
    const [type, setType] = useState("income");
    const [icon, setIcon] = useState("💰");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [errors, setErrors] = useState({name: "",});
    const [open, setOpen] = useState(false);

    const validate = () => {
        const newErrors = {
            name: "",
        };

        if (!name.trim()) {
            newErrors.name = "กรุณากรอกชื่อหมวดหมู่";
        }

        return newErrors;
    };
    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const validationErrors = validate();

        setErrors(validationErrors);

        const hasError = Object.values(
            validationErrors
        ).some(Boolean);

        if (hasError) return;

        try {
            const newCategory = {
                id: Date.now(),
                name,
                type:
                    type as
                        | "income"
                        | "expense",
                icon,
            };

            onCreateCategory(
                newCategory
            );

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full"
        >
            <div className="flex flex-row items-center w-full relative">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center justify-center gap-2 text-primary-500 hover:text-primary-600 cursor-pointer absolute left-0 z-10"
                >
                    <i className="bi bi-chevron-left text-xl text-primary-50"></i>
                    <span className="text-lg font-base text-primary-50">กลับ</span>
                </button>
                <h1 className="text-xl text-gray-800 text-center w-full">สร้างหมวดหมู่ใหม่</h1>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2 items-center justify-center w-full">
                    <label className="text-sm text-primary-70 ">ไอคอนหมวดหมู่</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(prev => !prev)}
                            className="flex items-center justify-center w-16 h-16 text-5xl border border-gray-10 rounded-full hover:bg-gray-10 cursor-pointer transition"
                        >
                            {icon}
                        </button>

                        {showEmojiPicker && (
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 shadow-lg">
                                <EmojiPicker
                                    onEmojiClick={(emojiData) => {
                                        setIcon(emojiData.emoji);
                                        setShowEmojiPicker(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={`flex flex-row gap-2 justify-between w-full ${errors.name ? "items-center" : "items-end"}`}>
                    <div className="flex flex-col items-start justify-center w-full">
                        <label className="text-sm text-primary-70 text-left pl-4">
                            ชื่อหมวดหมู่
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>{
                                setName(e.target.value);
                                if (errors.name) {
                                    setErrors({
                                        ...errors,
                                        name: "",
                                    });
                                }}
                            }
                            placeholder="กรุณากรอกชื่อหมวดหมู่"
                            className="border border-gray-20 rounded-2xl py-2 pl-2 pr-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-40 text-gray-50 placeholder-gray-40"
                        />
                        {errors.name && (
                            <p className="text-error-40 text-sm mt-1 pl-4">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="relative w-1/3">
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className={`w-full rounded-2xl p-2 ${type === "income" ? "bg-success-10 text-success-50 hover:bg-success-20" : "bg-error-10 text-error-50 hover:bg-error-20"} transition cursor-pointer`}
                        >
                            {type === "income" ? "รายรับ" : "รายจ่าย"}
                        </button>
                        {open && (
                            <div className="absolute top-full mt-2 left-0 w-full bg-primary-10 rounded-xl shadow-lg z-50">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setType("income");
                                        setOpen(false);
                                    }}
                                    className="w-full p-2 text-left hover:bg-primary-30 transition rounded-t-xl"
                                >
                                    รายรับ
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setType("expense");
                                        setOpen(false);
                                    }}
                                    className="w-full p-2 text-left hover:bg-primary-30 transition rounded-b-xl"
                                >
                                    รายจ่าย
                                </button>
                            </div>
                        )}
                    </div>
                </div>   
            </div>
            <PrimaryButton >บันทึก</PrimaryButton>
        </form>
    );
}