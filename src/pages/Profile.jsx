import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

function Profile() {
    const { user, updateProfile } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                password: user.password || ""
            });
        }
    }, [user, editing]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!form.name || !form.email) {
            toast.error("Name and Email are required");
            return;
        }

        const result = updateProfile(form.name, form.email, form.password);

        if (result.success) {
            setEditing(false);
            toast.success("Profile updated successfully!");
        } else {
            toast.error("Failed to update profile.");
        }
    };

    const handleCancel = () => {
        setEditing(false);
        if (user) setForm(user);
    };

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 font-sans animate-fade-in">

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
                Account Settings
            </h2>

            <div className="bg-white rounded-4xl shadow-xl shadow-gray-200/40 border border-gray-100 p-6 sm:p-10 transition-all duration-300">

                <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-10 border-b border-gray-100">
                    <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl font-black shadow-inner">
                        {initial}
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl font-bold text-gray-900">{user?.name || "User"}</h3>
                        <p className="text-gray-500 font-medium">Manage your personal information</p>
                    </div>
                </div>

                <div className="space-y-6 max-w-xl">

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700 ml-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className={`w-5 h-5 ${editing ? 'text-emerald-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                disabled={!editing}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:bg-transparent disabled:border-transparent disabled:px-11 disabled:shadow-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className={`w-5 h-5 ${editing ? 'text-emerald-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                disabled={!editing}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:bg-transparent disabled:border-transparent disabled:px-11 disabled:shadow-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className={`w-5 h-5 ${editing ? 'text-emerald-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <input
                                type={editing ? "text" : "password"}
                                name="password"
                                value={form.password}
                                placeholder={editing ? "Enter new password" : "••••••••"}
                                disabled={!editing}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:bg-transparent disabled:border-transparent disabled:px-11 disabled:shadow-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="pt-6 mt-6 flex flex-col sm:flex-row gap-4">
                        {!editing ? (
                            <button
                                onClick={() => setEditing(true)}
                                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-200 transform active:scale-95 shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-200 transform active:scale-95 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-8 rounded-2xl border border-gray-200 transition-all duration-200 transform active:scale-95 flex items-center justify-center"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;