import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";

import {
    getTransactions,
    deleteTransaction,
    updateTransaction
} from "../services/transactionService";

import { useNavigate } from "react-router-dom";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [modal, setModal] = useState(null);
    const [editTransaction, setEditTransaction] = useState(null);

    const navigate = useNavigate();

    const loadTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTransaction(id);

            setModal({
                type: "success",
                message: "Transaction deleted successfully"
            });

            loadTransactions();

        } catch (error) {
            setModal({
                type: "error",
                message: "Failed to delete transaction"
            });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateTransaction(
                editTransaction.id,
                editTransaction
            );

            setEditTransaction(null);

            setModal({
                type: "success",
                message: "Transaction updated successfully"
            });

            loadTransactions();

        } catch (error) {
            setModal({
                type: "error",
                message: "Failed to update transaction"
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-5 md:p-8 lg:p-10">

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">

                        <div>
                            <p className="text-sm font-medium text-blue-600 mb-1">
                                Finance
                            </p>

                            <h1 className="text-3xl font-bold text-slate-900">
                                Transactions
                            </h1>

                            <p className="text-slate-500 mt-2">
                                View and manage your financial activity.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/transactions")}
                            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 cursor-pointer"
                        >
                            Add Transaction
                        </button>

                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[800px]">

                                <thead className="bg-slate-50 border-b border-slate-200">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Description
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Type
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {transactions.map((t) => (

                                        <tr
                                            key={t.id}
                                            className="hover:bg-slate-50 transition"
                                        >

                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                {t.description}
                                            </td>

                                            <td className="px-6 py-4 text-slate-600">
                                                {t.category}
                                            </td>

                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                ${Number(t.amount).toFixed(2)}
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                        t.type === "Income"
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-red-50 text-red-700"
                                                    }`}
                                                >
                                                    {t.type}
                                                </span>

                                            </td>

                                            <td className="px-6 py-4 text-slate-600">
                                                {new Date(t.date).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() => setEditTransaction(t)}
                                                        className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition cursor-pointer"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(t.id)}
                                                        className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 transition cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                    {transactions.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-16 text-center"
                                            >
                                                <p className="text-slate-900 font-semibold">
                                                    No transactions yet
                                                </p>

                                                <p className="text-slate-500 text-sm mt-1">
                                                    Add your first transaction to start tracking your finances.
                                                </p>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </main>
            </div>

            {editTransaction && (

                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                    <form
                        onSubmit={handleUpdate}
                        className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl"
                    >

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Edit Transaction
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Update your transaction details.
                            </p>
                        </div>

                        <div className="space-y-4">

                            <input
                                className="border border-slate-200 p-3 rounded-xl w-full outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                placeholder="Description"
                                value={editTransaction.description}
                                onChange={(e) =>
                                    setEditTransaction({
                                        ...editTransaction,
                                        description: e.target.value
                                    })
                                }
                            />

                            <input
                                className="border border-slate-200 p-3 rounded-xl w-full outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                type="number"
                                step="0.01"
                                placeholder="Amount"
                                value={editTransaction.amount}
                                onChange={(e) =>
                                    setEditTransaction({
                                        ...editTransaction,
                                        amount: e.target.value
                                    })
                                }
                            />

                            <input
                                className="border border-slate-200 p-3 rounded-xl w-full outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                placeholder="Category"
                                value={editTransaction.category}
                                onChange={(e) =>
                                    setEditTransaction({
                                        ...editTransaction,
                                        category: e.target.value
                                    })
                                }
                            />

                            <select
                                className="border border-slate-200 p-3 rounded-xl w-full outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
                                value={editTransaction.type}
                                onChange={(e) =>
                                    setEditTransaction({
                                        ...editTransaction,
                                        type: e.target.value
                                    })
                                }
                            >
                                <option value="Income">
                                    Income
                                </option>

                                <option value="Expense">
                                    Expense
                                </option>
                            </select>

                        </div>

                        <div className="flex gap-3 mt-6">

                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 cursor-pointer"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditTransaction(null)}
                                className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 cursor-pointer"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

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

export default Transactions;