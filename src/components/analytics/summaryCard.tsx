type Props = {
    income: number;
    expense: number;
};

export default function SummaryCards({
    income,
    expense,
}: Props) {
    return (
        <div className="flex flex-row justify-between w-full gap-4">
            <div className="flex flex-col w-full gap-2">
                <p className="text-base text-gray-50">
                    รายรับรวม
                </p>

                <div className="text-xl font-bold text-success-50 bg-success-10 p-4 rounded-2xl">
                    {income.toLocaleString()} บาท
                </div>
            </div>

            <div className="flex flex-col w-full gap-2">
                <p className="text-base text-gray-50">
                    รายจ่ายรวม
                </p>

                <div className="text-xl font-bold text-error-50 bg-error-20 p-4 rounded-2xl">
                    {expense.toLocaleString()} บาท
                </div>
            </div>
        </div>
    );
}