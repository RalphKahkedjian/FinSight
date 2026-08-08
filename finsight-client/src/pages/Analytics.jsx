import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnalyticsCard from "../components/AnalyticsCard";
import ExpensePieChart from "../components/ExpensePieChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";

import { getAnalytics } from "../services/analyticsService";

function Analytics() {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const data = await getAnalytics();
            setAnalytics(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!analytics) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-5 md:p-8 lg:p-10">

                    <div className="mb-8">
                        <p className="text-sm font-medium text-blue-600 mb-1">
                            Financial overview
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Analytics
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Track your financial performance and spending habits.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                        <AnalyticsCard
                            title="Balance"
                            value={`$${analytics.balance.toFixed(2)}`}
                        />

                        <AnalyticsCard
                            title="Total Income"
                            value={`$${analytics.totalIncome.toFixed(2)}`}
                        />

                        <AnalyticsCard
                            title="Total Expenses"
                            value={`$${analytics.totalExpenses.toFixed(2)}`}
                        />

                        <AnalyticsCard
                            title="Transactions"
                            value={analytics.transactionCount}
                        />

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Expense Breakdown
                                </h2>

                                <p className="text-sm text-slate-500">
                                    See where your money is going.
                                </p>
                            </div>

                            <ExpensePieChart
                                data={analytics.categoryBreakdown}
                            />
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Income vs Expenses
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Monthly financial activity.
                                </p>
                            </div>

                            <IncomeExpenseChart
                                data={analytics.monthlyData}
                            />
                        </div>

                    </div>

                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-slate-900">
                            Additional Statistics
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            More details about your financial activity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                        <AnalyticsCard
                            title="Largest Expense"
                            value={`$${analytics.largestExpense.toFixed(2)}`}
                        />

                        <AnalyticsCard
                            title="Largest Income"
                            value={`$${analytics.largestIncome.toFixed(2)}`}
                        />

                        <AnalyticsCard
                            title="Average Expense"
                            value={`$${analytics.averageExpense.toFixed(2)}`}
                        />

                        <AnalyticsCard
                            title="Savings Rate"
                            value={`${analytics.savingsRate.toFixed(1)}%`}
                        />

                    </div>

                </main>
            </div>
        </div>
    );
}

export default Analytics;