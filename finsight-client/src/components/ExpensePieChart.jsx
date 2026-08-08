import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899"
];

function ExpensePieChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-5">
                Expenses by Category
            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="category"
                        outerRadius={120}
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ExpensePieChart;