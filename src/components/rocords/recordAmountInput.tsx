type Props = {
    value: string;
    error?: string;
    onChange: (value: string) => void;
};

export default function RecordAmountInput({
    value,
    error,
    onChange,
}: Props) {
    return (
        <div className="flex flex-col items-start justify-center w-full">
            <div className="relative w-full">
                <input
                    value={value}
                    onChange={(e) =>onChange(e.target.value)}
                    placeholder="กรุณากรอกจำนวนเงิน"
                    className="border border-gray-20 rounded-2xl py-2 pl-2 pr-12 w-full focus:outline-none focus:ring-1 focus:ring-primary-40 text-gray-50 placeholder-gray-40"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-40">
                บาท
                </span>
                </div>
                {error && (
                    <p className="text-error-40 text-sm mt-1 pl-4">{error}</p>
                )}
           
        </div>
    );
}