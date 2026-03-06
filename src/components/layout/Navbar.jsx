import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getSession } from "../../utils/storage";

function Navbar({ onMenuClick }) {
    const { user, logout } = useAuth();
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const session = getSession();
        if (!session) return;

        const updateTimer = () => {
            const remaining = session.expiresAt - Date.now();
            setTimeLeft(remaining > 0 ? remaining : 0);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center sticky top-0 z-20 shadow-sm">

            <div className="flex items-center gap-4">
                <div onClick={onMenuClick} className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </div>

                <h2 className="font-bold text-gray-800 hidden sm:block">
                    Welcome back, <span className="text-emerald-600">{user?.name || "User"}</span> 👋
                </h2>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
                <div className="hidden sm:flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold border border-orange-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {formatTime(timeLeft)}
                </div>

                <div
                    onClick={logout}
                    className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-xl text-sm transition-colors duration-200 active:scale-95"
                >
                    Logout
                </div>
            </div>
        </div>
    );
}

export default Navbar;