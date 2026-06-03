// RecordForm.tsx

import type { Category } from "../../types/category";
import type {
    RecordErrors,
    RecordFormData,
} from "../../types/records";

import RecordDateTime from "./recordDateTime";
import RecordTypeSelector from "./recordTypeSelector";
import RecordAmountInput from "./recordAmountInput";
import CategorySelector from "./categorySelector";
import Description from "./description";

type Props = {
    formData: RecordFormData;

    errors: RecordErrors;

    categories: Category[];

    onChange: (
        data: RecordFormData
    ) => void;

    onCreateCategory: () => void;
};

export default function RecordForm({
    formData,
    errors,
    categories,
    onChange,
    onCreateCategory,
}: Props) {
    const filteredCategories =
        categories.filter(
            (category) =>
                category.type === formData.type
        );

    return (
        <div className="flex flex-col gap-2">
            {/* Date & Time */}
            <RecordDateTime
                date={formData.date}
                onDateChange={(date) =>
                    onChange({
                        ...formData,
                        date,
                    })
                }
            />

            {/* Type + Amount */}
            <div className="flex gap-2">
                <div className="w-1/3">
                    <RecordTypeSelector
                        type={formData.type}
                        onChange={(type) =>
                            onChange({
                                ...formData,
                                type,
                                category: null,
                            })
                        }
                    />
                </div>

                <div className="flex-1">
                    <RecordAmountInput
                        value={formData.amount}
                        error={errors.amount}
                        onChange={(amount) =>
                            onChange({
                                ...formData,
                                amount,
                            })
                        }
                    />
                </div>
            </div>

            {/* Category */}
            <CategorySelector
                categories={filteredCategories}
                selectedCategory={
                    formData.category
                }
                error={errors.category}
                onSelect={(category) =>
                    onChange({
                        ...formData,
                        category,
                    })
                }
                onCreateCategory={
                    onCreateCategory
                }
            />

            {/* Description */}
            <Description
                value={formData.description}
                onChange={(
                    description
                ) =>
                    onChange({
                        ...formData,
                        description,
                    })
                }
            />
        </div>
    );
}