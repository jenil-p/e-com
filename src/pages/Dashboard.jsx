import { getCart, getOrders } from "../utils/storage";
import { useEffect, useState } from "react";

function Dashboard() {
    const [cartCount, setCartCount] = useState(0);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const cart = getCart();
        const orderData = getOrders();

        const items = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(items);
        setOrders(orderData);
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans animate-fade-in">

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
                Your Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center justify-between transition-transform hover:-translate-y-1 duration-300">
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Items in Cart</h3>
                        <p className="text-4xl font-black text-gray-900">{cartCount}</p>
                    </div>
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center justify-between transition-transform hover:-translate-y-1 duration-300">
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Orders</h3>
                        <p className="text-4xl font-black text-gray-900">{orders.length}</p>
                    </div>
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    </div>
                </div>
            </div>

            {/* previous orders */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h3>

                {orders.length === 0 ? (
                    <div className="bg-gray-50 rounded-3xl p-10 text-center border border-gray-100">
                        <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {orders.slice().reverse().map(order => {
                            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

                            return (
                                <div key={order.id} className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg shadow-gray-200/30 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all hover:shadow-xl hover:border-emerald-100">

                                    {/* Order Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-extrabold text-lg text-gray-900">#{order.id.toString().slice(-6)}</span>
                                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full">
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium mb-4">{order.date} • {totalItems} items</p>

                                        {/* Premium Image Thumbnails */}
                                        <div className="flex items-center">
                                            {order.items.slice(0, 4).map((item, idx) => (
                                                <div key={item.id} className={`w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center bg-gray-50 ${idx !== 0 ? '-ml-3' : ''}`}>
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-xs font-bold text-gray-400">{item.title.charAt(0)}</span>
                                                    )}
                                                </div>
                                            ))}
                                            {order.items.length > 4 && (
                                                <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center -ml-3 z-10">
                                                    <span className="text-xs font-bold text-gray-600">+{order.items.length - 4}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* price */}
                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                                        <p className="text-2xl font-black text-gray-900">${order.total.toFixed(2)}</p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;