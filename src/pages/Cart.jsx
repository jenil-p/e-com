import { useEffect, useState } from "react";
import CartItem from "../components/cart/CartItem";
import { getCart, saveCart, getOrders, saveOrders } from "../utils/storage";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
        updateCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQty = (id) => {
        updateCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
    };

    const removeItem = (id) => {
        updateCart(cart.filter(item => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        updateCart([]);
        toast.success("Order placed successfully!");
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 font-medium mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/products" className="text-black">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
                Shopping Cart
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                <div className="lg:col-span-8 flex flex-col gap-4">
                    {cart.map(item => (
                        <div key={item.id} className="bg-white rounded-3xl p-2 pr-4 sm:p-4 shadow-sm border border-gray-100 transition-all hover:border-gray-200">
                            <CartItem
                                item={item}
                                onIncrease={increaseQty}
                                onDecrease={decreaseQty}
                                onRemove={removeItem}
                            />
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-white rounded-4xl p-6 sm:p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 lg:sticky lg:top-24">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Shipping</span>
                                <span className="text-emerald-600 font-bold">Free</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-900 font-bold">Total</span>
                                <span className="text-3xl font-black text-gray-900">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={placeOrder}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 rounded-2xl transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-emerald-600/30"
                        >
                            Proceed to Checkout
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4 font-medium flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            Secure Checkout
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Cart;