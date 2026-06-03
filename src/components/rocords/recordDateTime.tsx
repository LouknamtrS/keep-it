type Props = {
    date: string;
    onDateChange: (date: string) => void;
};

export default function RecordDateTime({
    date,
    onDateChange,
}: Props) {
    return (
        <div className="flex gap-2">
            <input
                type="date"
                value={date}
                onChange={(e) =>onDateChange(e.target.value)}
                className="rounded-2xl py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-primary-40 bg-primary-10"
            />
        </div>
    );
}