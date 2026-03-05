import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 bg-gray-700 shadow-md p-6">

            <h1 className="font-bold mb-8">
                ShopDash
            </h1>

            <nav className="flex flex-col gap-4">

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/products">Products</Link>

                <Link to="/cart">Cart</Link>

                <Link to="/profile">Profile</Link>

            </nav>

        </div>
    );
}

export default Sidebar;