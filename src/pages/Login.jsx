import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = login(form.email, form.password);

        setIsLoading(false);

        if (result.success) {
            toast.success("Welcome back!");
            navigate("/dashboard");
        } else {
            toast.error(result.message || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 p-4 sm:p-8 font-sans">

            <div className="max-w-md w-full bg-white rounded-3xl sm:rounded-4xl shadow-2xl shadow-gray-200/50 p-6 sm:p-10 border border-white">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 mt-2 text-xs sm:text-sm font-medium">
                        Log in to continue your shopping
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 text-sm sm:text-base placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 text-sm sm:text-base placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base sm:text-lg py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center shadow-lg shadow-emerald-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm font-medium text-gray-500">
                    New here?{' '}
                    <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline underline-offset-4 transition-all">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;