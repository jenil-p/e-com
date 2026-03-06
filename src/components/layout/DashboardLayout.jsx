import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-screen bg-gray-50 font-sans">

            <Sidebar
                isOpen={isMobileMenuOpen}
                closeMenu={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 overflow-y-auto lg:p-8 custom-scrollbar">
                    <Outlet />
                </main>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}

export default DashboardLayout;