import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getProfile } from "../services/profileService";

function Profile() {
    const [profile, setProfile] = useState(null);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-5 md:p-8 lg:p-10">

                    {/* Header */}

                    <div className="max-w-5xl mx-auto mb-8">

                        <p className="text-sm font-semibold text-blue-600 mb-2">
                            Account
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                            Profile
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Manage your FinSight account and personal information.
                        </p>

                    </div>


                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Profile Summary */}

                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">

                            <div className="flex flex-col items-center text-center">

                                {/* Avatar */}

                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                                    <span className="text-3xl font-bold text-white">
                                        {profile?.fullName
                                            ? profile.fullName
                                                .split(" ")
                                                .map((name) => name[0])
                                                .slice(0, 2)
                                                .join("")
                                                .toUpperCase()
                                            : "U"}
                                    </span>

                                </div>


                                {profile ? (
                                    <>
                                        <h2 className="text-xl font-bold text-slate-900 mt-5">
                                            {profile.fullName}
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1 break-all">
                                            {profile.email}
                                        </p>
                                    </>
                                ) : (
                                    <div className="mt-5 space-y-2">
                                        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
                                        <div className="h-4 w-44 bg-slate-100 rounded animate-pulse" />
                                    </div>
                                )}


                                <div className="w-full border-t border-slate-100 mt-7 pt-6">

                                    <div className="flex items-center justify-between">

                                        <span className="text-sm text-slate-500">
                                            Account status
                                        </span>

                                        <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">

                                            <span className="w-2 h-2 rounded-full bg-emerald-500" />

                                            Active

                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Personal Information */}

                        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                            <div className="px-7 py-6 border-b border-slate-100">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                                        <svg
                                            className="w-5 h-5 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>

                                    </div>

                                    <div>

                                        <h2 className="text-lg font-bold text-slate-900">
                                            Personal Information
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Your FinSight account details
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {profile ? (

                                <div className="divide-y divide-slate-100">

                                    {/* Full Name */}

                                    <div className="px-7 py-6">

                                        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                            Full Name
                                        </p>

                                        <p className="text-base font-semibold text-slate-900">
                                            {profile.fullName}
                                        </p>

                                    </div>


                                    {/* Email */}

                                    <div className="px-7 py-6">

                                        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                            Email Address
                                        </p>

                                        <p className="text-base font-semibold text-slate-900 break-all">
                                            {profile.email}
                                        </p>

                                    </div>


                                    {/* Joined */}

                                    <div className="px-7 py-6">

                                        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                            Member Since
                                        </p>

                                        <p className="text-base font-semibold text-slate-900">
                                            {new Date(
                                                profile.createdAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <div className="p-7 space-y-7">

                                    {[1, 2, 3].map((item) => (

                                        <div key={item}>

                                            <div className="h-3 w-24 bg-slate-200 rounded animate-pulse mb-3" />

                                            <div className="h-5 w-48 bg-slate-100 rounded animate-pulse" />

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>


                    {/* Security Section */}

                    <div className="max-w-5xl mx-auto mt-6">

                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">

                            <div className="flex items-center justify-between gap-5">

                                <div>

                                    <h2 className="text-lg font-bold text-slate-900">
                                        Account Security
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Your account is protected by secure authentication.
                                    </p>

                                </div>

                                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold">

                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                                    Secure

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Profile;