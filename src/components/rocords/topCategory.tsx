type TopCategoryItem = {
    id: number;
    name: string;
    icon: string;
    total: number;
    count: number;
};

type Props = {
    categories: TopCategoryItem[];
};

export default function TopCategory({
    categories,
}: Props) {
    
    return (
        <div className="bg-white rounded-xl p-4 max-w-96 w-full">
            <h2 className="text-lg mb-4">หมวดหมู่ยอดนิยม</h2>
            <div className="flex flex-col gap-3">
                {categories.slice(0, 5).map((category,index) => (
                    <div key={category.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-primary-40 w-5"># {index + 1}</span>
                            <span className="text-2xl">{category.icon}</span>
                            <div>
                                <p className="font-medium text-left">{category.name}</p>
                                <p className="text-xs text-gray-50">{category.count}{" "}รายการ</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">{category.total.toLocaleString()}</p>
                            <p className="text-xs text-gray-50">บาท</p>
                        </div>
                    </div>
                    )
                )}
            </div>
        </div>
    );
}