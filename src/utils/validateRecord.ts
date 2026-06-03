import type {
    RecordErrors,
    RecordFormData,
} from "../types/records";

export function validateRecord(
    formData: RecordFormData
): RecordErrors {
    const errors: RecordErrors = {
        amount: "",
        category: "",
        description: "",
    };

    if (!formData.amount.trim()) {
        errors.amount = "กรุณากรอกจำนวนเงิน";
    } else if (
        Number(formData.amount) <= 0
    ) {
        errors.amount =
            "จำนวนเงินต้องมากกว่า 0";
    }

    if (!formData.category) {
        errors.category =
            "กรุณาเลือกหมวดหมู่";
    }

    return errors;
}