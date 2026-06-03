import type { Category } from "../../types/category";

type Props = {
    categories: Category[];
    selectedCategory: Category | null;
    error?: string;
    onSelect: (category: Category) => void;
    onCreateCategory: () => void;
};

export default function CategorySelector({
    categories,
    selectedCategory,
    error,
    onSelect,
    onCreateCategory,
}: Props) {
    return (
        <div className="bg-highlight-10 rounded-xl pt-2 px-4 pb-2">
            <button
                type="button"
                onClick={onCreateCategory}
                className="flex flex-row w-full items-center gap-2 justify-end text-sm text-primary-50 cursor-pointer"
            >
                กำหนดเอง
                <i className="bi bi-chevron-right text-xl text-primary-50"></i>
            </button>

            <div className="grid grid-cols-4 gap-2 max-h-60 overflow-scroll p-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() =>
                            onSelect(category)
                        }
                        className={`flex flex-col items-center gap-2 transition cursor-pointer ${
                            selectedCategory?.id ===
                            category.id
                                ? "scale-105"
                                : ""
                        }`}
                    >
                        <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl border-2 transition ${
                                selectedCategory?.id ===
                                category.id
                                    ? "border-primary-50"
                                    : "border-transparent"
                            } ${
                                category.type ===
                                "income"
                                    ? "bg-success-10 text-success-50"
                                    : "bg-error-20 text-error-50"
                            }`}
                        >
                            {category.iconName}
                        </div>

                        <span className="text-sm text-center w-20 line-clamp-2">
                            {category.name}
                        </span>
                    </button>
                ))}
            </div>

            {error && (
                <p className="text-error-40 text-sm mt-2">
                    {error}
                </p>
            )}
        </div>
    );
}