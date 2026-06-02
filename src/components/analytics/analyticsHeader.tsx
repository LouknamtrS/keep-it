import { getThaiMonthName} from "../../utils/date";
type Props = {
    month: number;
    year: number;
    onPrev: () => void;
    onNext: () => void;
};


export default function AnalyticsHeader({
    month,
    year,
    onPrev,
    onNext,
}: Props) {
    return (
        <div className="flex justify-between items-center w-full mb-2">
            <button onClick={onPrev}>
                <i className="bi bi-chevron-left text-xl text-primary-50" />
            </button>

            <p className="text-lg font-semibold text-gray-50">
                {getThaiMonthName(month)} {year}
            </p>

            <button onClick={onNext}>
                <i className="bi bi-chevron-right text-xl text-primary-50" />
            </button>
        </div>
    );
}