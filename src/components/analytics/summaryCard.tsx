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
                <p className="text-base text-gray-50 text-left">
                    รายรับรวม
                </p>

                <div className="text-lg font-medium text-success-50 bg-success-10 p-3 rounded-2xl">
                    {income.toLocaleString()} บาท
                </div>
            </div>

            <div className="flex flex-col w-full gap-2">
                <p className="text-base text-gray-50 text-left">
                    รายจ่ายรวม
                </p>

                <div className="text-lg font-medium text-error-50 bg-error-20 p-3 rounded-2xl">
                    {expense.toLocaleString()} บาท
                </div>
            </div>
        </div>
    );
}