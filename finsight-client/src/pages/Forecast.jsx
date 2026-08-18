import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ForecastChart from "../components/ForecastChart";
import { getForecast } from "../services/forecastService";

function Forecast() {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadForecast = async () => {
            try {
                const data = await getForecast();
                setForecast(data.forecast || []);
            } catch (err) {
                console.error(err);
                setError("Unable to load your financial forecast.");
            } finally {
                setLoading(false);
            }
        };

        loadForecast();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-5 md:p-8 lg:p-10">

                    {/* Header */}
                    <div className="mb-8">
                        <p className="text-sm font-medium text-blue-600 mb-1">
                            AI Financial Planning
                        </p>

                        <h1 className="text-3xl font-bold text-slate-900">
                            Financial Forecast
                        </h1>

                        <p className="text-slate-500 mt-2">
                            AI-powered predictions based on your spending history.
                        </p>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8">
                            <p className="text-slate-500">
                                Generating your forecast...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                            <p className="text-red-600 font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Forecast */}
                    {!loading && !error && forecast.length > 0 && (
                        <div className="space-y-6">

                            {/* Chart */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        Predicted Spending
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Forecast generated using Facebook Prophet.
                                    </p>
                                </div>

                                <ForecastChart data={forecast} />
                            </div>

                            {/* Forecast summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <p className="text-sm text-slate-500">
                                        Starting Prediction
                                    </p>

                                    <p className="text-2xl font-bold text-slate-900 mt-2">
                                        ${forecast[0].predicted.toFixed(2)}
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                        {forecast[0].date}
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <p className="text-sm text-slate-500">
                                        Final Prediction
                                    </p>

                                    <p className="text-2xl font-bold text-blue-600 mt-2">
                                        ${forecast[forecast.length - 1].predicted.toFixed(2)}
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                        {forecast[forecast.length - 1].date}
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <p className="text-sm text-slate-500">
                                        Forecast Period
                                    </p>

                                    <p className="text-2xl font-bold text-slate-900 mt-2">
                                        {forecast.length} days
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                        AI prediction window
                                    </p>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* No data */}
                    {!loading && !error && forecast.length === 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Not enough data
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Add more transactions to generate a meaningful forecast.
                            </p>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

export default Forecast;