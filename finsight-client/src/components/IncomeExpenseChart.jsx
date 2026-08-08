import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function IncomeExpenseChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-5">

                Monthly Income vs Expenses

            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="income"
                        fill="#10B981"
                    />

                    <Bar
                        dataKey="expenses"
                        fill="#EF4444"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default IncomeExpenseChart;