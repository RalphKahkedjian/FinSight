import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { createTransaction } from "../services/transactionService";

function Transaction() {
    const navigate = useNavigate();

    const [transaction, setTransaction] = useState({
        description: "",
        amount: "",
        category: "",
        type: "Income",
        date: new Date().toISOString()
    });

    const [modal, setModal] = useState(null);

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createTransaction(transaction);

            setModal({
                type: "success",
                message: "Transaction added successfully"
            });

            setTimeout(() => {
                navigate("/transaction");
            }, 1000);

        } catch (error) {
            console.error(error);

            setModal({
                type: "error",
                message: "Failed to add transaction"
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-5 md:p-8 lg:p-10">

                    <div className="max-w-2xl mx-auto">

                        <div className="mb-8">
                            <p className="text-sm font-medium text-blue-600 mb-1">
                                Finance
                            </p>

                            <h1 className="text-3xl font-bold text-slate-900">
                                Add Transaction
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Record a new income or expense.
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5"
                            >

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Description
                                    </label>

                                    <input
                                        name="description"
                                        type="text"
                                        placeholder="e.g. Grocery shopping"
                                        value={transaction.description}
                                        onChange={handleChange}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Amount
                                    </label>

                                    <input
                                        name="amount"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={transaction.amount}
                                        onChange={handleChange}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Category
                                    </label>

                                    <input
                                        name="category"
                                        type="text"
                                        placeholder="e.g. Food, Rent, Salary"
                                        value={transaction.category}
                                        onChange={handleChange}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Type
                                        </label>

                                        <select
                                            name="type"
                                            value={transaction.type}
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
                                        >
                                            <option value="Income">
                                                Income
                                            </option>

                                            <option value="Expense">
                                                Expense
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Date
                                        </label>

                                        <input
                                            name="date"
                                            type="date"
                                            value={transaction.date.substring(0, 10)}
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        />
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="mt-3 w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 cursor-pointer"
                                >
                                    Add Transaction
                                </button>

                            </form>

                        </div>
                    </div>

                </main>
            </div>

            {modal && (
                <Modal
                    type={modal.type}
                    message={modal.message}
                    onClose={() => setModal(null)}
                />
            )}

        </div>
    );
}

export default Transaction;