import { useState } from "react";

export function useRecordForm() {

    const now = new Date();

    const [formData, setFormData] =
        useState({
            type: "income",
            amount: "",
            description: "",
            date:
                now.toISOString().split(
                    "T"
                )[0],
            time:
                now
                    .toTimeString()
                    .slice(0, 5),
            category: null,
        });

    const resetForm = () => {
        setFormData({
            type: "income",
            amount: "",
            description: "",
            date: now.toISOString().split("T")[0],
            time: now.toTimeString().slice(0, 5),
            category: null,
        });
    };

    return {
        formData,
        setFormData,
        resetForm,
    };
}