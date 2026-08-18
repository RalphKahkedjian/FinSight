import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    ComposedChart
} from "recharts";

function ForecastChart({ data }) {

    return (
        <div className="w-full h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

                <ComposedChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 10
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                    />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(date) =>
                            new Date(date).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "numeric"
                                }
                            )
                        }
                    />

                    <YAxis
                        tick={{ fontSize: 12 }}
                    />

                    <Tooltip />

                    {/* Confidence range */}

                    <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="none"
                        fill="#bfdbfe"
                        fillOpacity={0.35}
                    />

                    <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="none"
                        fill="#ffffff"
                        fillOpacity={1}
                    />

                    {/* Forecast */}

                    <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={false}
                    />

                </ComposedChart>

            </ResponsiveContainer>

        </div>
    );
}

export default ForecastChart;