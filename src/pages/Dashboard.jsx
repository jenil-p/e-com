import { getCart, getOrders } from "../utils/storage";
import { useEffect, useState } from "react";

function Dashboard() {

    const [cartCount, setCartCount] = useState(0);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const cart = getCart();
        const orderData = getOrders();

        const items = cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        setCartCount(items);
        setOrders(orderData);

    }, []);

    return (
        <div className="space-y-6">

            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                <div className="bg- p-6 rounded shadow">
                    <h3 className="text-gray-500">Cart Items</h3>
                    <p className="text-2xl font-bold">{cartCount}</p>
                </div>

                <div className="bg- p-6 rounded shadow">
                    <h3 className="text-gray-500">Orders</h3>
                    <p className="text-2xl font-bold">{orders.length}</p>
                </div>

            </div>

            <div className="bg-gray-500 p-6 rounded shadow">

                <h3 className="font-semibold mb-4">
                    Recent Orders
                </h3>

                {orders.length === 0 ? (
                    <p>No orders yet</p>
                ) : (
                    orders.reverse().map(order => {

                        const totalItems = order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                        );

                        return (
                            <div
                                key={order.id}
                                className="border rounded p-4 mb-4"
                            >

                                <div className="flex justify-between mb-2">

                                    <div>
                                        <p className="font-semibold">
                                            Order #{order.id}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {order.date}
                                        </p>
                                    </div>

                                    <div className="text-right">

                                        <p className="font-semibold">
                                            ${order.total.toFixed(2)}
                                        </p>

                                        <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded">
                                            {order.status}
                                        </span>

                                    </div>

                                </div>

                                <p className="text-sm text-gray-600 mb-2">
                                    {totalItems} items
                                </p>

                                <div className="text-sm text-gray-700">

                                    {order.items.map(item => (
                                        <p key={item.id}>
                                            • {item.title} x{item.quantity}
                                        </p>
                                    ))}

                                    {order.items.length > 3 && (
                                        <p className="text-red-500">
                                            + {order.items.length - 3} more
                                        </p>
                                    )}

                                </div>

                            </div>
                        );
                    })
                )}

            </div>

        </div>
    );
}

export default Dashboard;