import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

type ChartItem = {
    categoryId: number;
    name: string;
    value: number;
};

type Props = {
    chartData: ChartItem[];
    total: number;
    activeTab: "income" | "expense";
};

export default function AnalyticsChart({
    chartData,
    total,
    activeTab,
}: Props) {
    const COLORS =
        activeTab === "income"
            ? [
                  "#16a34a",
                  "#22c55e",
                  "#4ade80",
                  "#86efac",
              ]
            : [
                  "#dc2626",
                  "#ef4444",
                  "#f87171",
                  "#fca5a5",
              ];

    return (
        <div className="w-full h-80 relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        innerRadius="45%"
                        labelLine={false}
                        label={({ name, percent, index }) =>
                            index < 5 ? `${name} ${((percent ?? 0) * 100).toFixed(0)}%` : ""
                        }
                    >
                        {chartData.map(
                            (_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            )
                        )}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm text-gray-500">
                    รวม
                </span>
                <span className="text-2xl font-bold">
                    {total.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                    บาท
                </span>
            </div>
        </div>
    );
}