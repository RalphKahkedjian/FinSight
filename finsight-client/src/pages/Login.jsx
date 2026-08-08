import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Modal from "../components/Modal";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await login({
                email,
                password
            });

            localStorage.setItem("token", data.data.token);

            setModal({
                type: "success",
                message: "Login successful"
            });

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            console.error(error);

            setModal({
                type: "error",
                message: "Invalid email or password"
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-5 shadow-lg shadow-blue-600/20">
                        <span className="text-white text-2xl font-bold">
                            F
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        FinSight
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Your personal financial dashboard
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-7 md:p-8">

                    <div className="mb-7">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Welcome back
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Sign in to continue to your account.
                        </p>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-5"
                    >

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 cursor-pointer"
                        >
                            Sign In
                        </button>

                    </form>

                    <p className="text-center mt-7 text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Create account
                        </Link>
                    </p>

                </div>
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

export default Login;