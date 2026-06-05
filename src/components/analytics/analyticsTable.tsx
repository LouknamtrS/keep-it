type ChartItem = {
    name: string;
    value: number;
};

type Props = {
    chartData: ChartItem[];
    total: number;
    hasData: boolean;
};

export default function AnalyticsTable({
    chartData,
    total,
    hasData,
}: Props) {
    return (
        <table className="w-full max-w-md lg:w-11/12 shadow-sm rounded-2xl overflow-hidden">
            <thead className="bg-primary-10 ">
                <tr className="text-center text-gray-50 ">
                    <th className="p-2 text-left">Title</th>
                    <th className="p-2">Percent</th>
                    <th className="p-2">Total</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {!hasData ? (
                    <tr>
                        <td
                            colSpan={3}
                            className="text-center py-8 text-gray-400"
                        >
                            ไม่พบข้อมูล
                        </td>
                    </tr>
                ) : (
                    chartData.map((item) => {
                        const percent = (
                            (item.value / total) *
                            100
                        ).toFixed(1);

                        return (
                            <tr
                                key={`${item.categoryId}-${item.name}`}
                                className="border-b border-gray-10"
                            >
                                <td className="p-2 text-left">
                                    {item.name}
                                </td>

                                <td className="p-2">
                                    {percent}%
                                </td>

                                <td className="p-2">
                                    {item.value.toLocaleString()}
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
}