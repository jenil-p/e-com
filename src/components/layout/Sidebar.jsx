import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, closeMenu }) {
    const location = useLocation();

    const links = [
        { name: "Dashboard", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { name: "Products", path: "/products", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
        { name: "Cart", path: "/cart", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" },
        { name: "Profile", path: "/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    ];

    return (
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-2xl shadow-gray-200/50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

            <div className="flex items-center justify-between p-6 border-b border-gray-50">
                <t className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg">S</span>
                    ShopDash
                </t>
                <div onClick={closeMenu} className="md:hidden p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
            </div>

            <nav className="p-4 flex flex-col gap-2">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-200 ${isActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <svg className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
                            </svg>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default Sidebar;