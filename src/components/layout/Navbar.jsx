import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getSession } from "../../utils/storage";

function Navbar() {

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

    // format in minutes and seconds
    const formatTime = (ms) => {

        const totalSeconds = Math.floor(ms / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="bg-black shadow p-4 flex justify-between items-center">

            <h2 className="font-semibold">
                Welcome {user?.name}
            </h2>

            <p className="text-sm text-gray-500">
                Session expires in {formatTime(timeLeft)}
            </p>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>

        </div>
    );
}

export default Navbar;