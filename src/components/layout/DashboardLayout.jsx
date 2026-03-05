import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="flex min-h-screen w-full bg-gray-900">

            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="p-6 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;