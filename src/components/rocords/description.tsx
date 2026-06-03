type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function Description({
    value,
    onChange,
}: Props) {
    return (
        <div className="flex flex-col items-start justify-center w-full">
            <label className="text-sm text-primary-70 text-left pl-4">
                หมายเหตุ
            </label>

            <input
                id="description"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="กรุณากรอกรายละเอียด"
                className="border border-gray-20 rounded-2xl py-2 pl-2 pr-12 w-full focus:outline-none focus:ring-1 focus:ring-primary-40 text-gray-50 placeholder-gray-40"
            />
        </div>
    );
}