import { useEffect, useState } from "react";
import CartItem from "../components/cart/CartItem";
import { getCart, saveCart, getOrders, saveOrders } from "../utils/storage";
import toast from "react-hot-toast";

function Cart() {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCart());
    }, []);

    const updateCart = (updated) => {
        setCart(updated);
        saveCart(updated);
    };

    const increaseQty = (id) => {

        const updated = cart.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        updateCart(updated);
    };

    const decreaseQty = (id) => {

        const updated = cart
            .map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0);

        updateCart(updated);
    };

    const removeItem = (id) => {

        const updated = cart.filter(item => item.id !== id);

        updateCart(updated);
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return <div className="p-10">Your cart is empty</div>;
    }

    // place this cart as order...
    const placeOrder = () => {
        const orders = getOrders();

        const newOrder = {
            id: Date.now(),
            items: cart,
            total,
            date: new Date().toLocaleString(),
            status: "Placed"
        };

        orders.push(newOrder);
        saveOrders(orders);
        saveCart([]);
        setCart([]);

        toast.success("Order placed successfully!");
    };

    return (
        <div className="p-10 max-w-4xl">

            <h2 className="text-2xl font-bold mb-6">
                Your Cart
            </h2>

            <div className="flex flex-col gap-4">

                {cart.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={increaseQty}
                        onDecrease={decreaseQty}
                        onRemove={removeItem}
                    />
                ))}

            </div>

            <div className="mt-6 text-xl font-bold">
                Total: ${total.toFixed(2)}
            </div>
            <button
                onClick={placeOrder}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
            >
                Checkout
            </button>

        </div>
    );
}

export default Cart;