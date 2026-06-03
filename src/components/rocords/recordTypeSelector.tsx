import { useState } from "react";

type Props = {
    type: "income" | "expense";

    onChange: (
        type: "income" | "expense"
    ) => void;
};

export default function RecordTypeSelector({
    type,
    onChange,
}: Props) {
    const [open, setOpen] =
        useState(false);

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() =>
                    setOpen(!open)
                }
                className={`w-full rounded-2xl p-2 ${
                    type === "income"
                        ? "bg-success-10 text-success-50 hover:bg-success-20"
                        : "bg-error-10 text-error-50 hover:bg-error-20"
                } transition cursor-pointer`}
            >
                {type === "income"
                    ? "รายรับ"
                    : "รายจ่าย"}
            </button>

            {open && (
                <div className="absolute top-full mt-2 left-0 w-full bg-primary-10 rounded-xl shadow-lg z-50">
                    <button
                        type="button"
                        onClick={() => {
                            onChange(
                                "income"
                            );
                            setOpen(
                                false
                            );
                        }}
                        className="w-full p-2 text-left hover:bg-primary-30 transition rounded-t-xl"
                    >
                        รายรับ
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            onChange(
                                "expense"
                            );
                            setOpen(
                                false
                            );
                        }}
                        className="w-full p-2 text-left hover:bg-primary-30 transition rounded-b-xl"
                    >
                        รายจ่าย
                    </button>
                </div>
            )}
        </div>
    );
}