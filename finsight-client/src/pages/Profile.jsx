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
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-5 md:p-8 lg:p-10">

                    <div className="mb-8">
                        <p className="text-sm font-medium text-blue-600 mb-1">
                            Account
                        </p>

                        <h1 className="text-3xl font-bold text-slate-900">
                            Profile
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Manage and view your account information.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm max-w-2xl overflow-hidden">

                        <div className="bg-slate-950 px-7 py-6">
                            <h2 className="text-xl font-semibold text-white">
                                Personal Information
                            </h2>

                            <p className="text-slate-400 text-sm mt-1">
                                Your FinSight account details
                            </p>
                        </div>

                        {profile ? (
                            <div className="p-7 space-y-6">

                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">
                                        Full Name
                                    </p>

                                    <p className="text-lg font-semibold text-slate-900">
                                        {profile.fullName}
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 pt-6">
                                    <p className="text-sm font-medium text-slate-500 mb-1">
                                        Email
                                    </p>

                                    <p className="text-lg font-semibold text-slate-900">
                                        {profile.email}
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 pt-6">
                                    <p className="text-sm font-medium text-slate-500 mb-1">
                                        Member Since
                                    </p>

                                    <p className="text-lg font-semibold text-slate-900">
                                        {new Date(profile.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                            </div>
                        ) : (
                            <div className="p-7">
                                <p className="text-slate-500">
                                    Loading profile...
                                </p>
                            </div>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
}

export default Profile;