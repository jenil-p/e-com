import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/product/ProductCard";
import { getCart, saveCart } from "../utils/storage";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
        setCart(getCart());
    }, []);

    const addToCart = (product) => {
        let currentCart = getCart();
        const exists = currentCart.find(item => item.id === product.id);

        let updatedCart;
        if (exists) {
            updatedCart = currentCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...currentCart, { ...product, quantity: 1 }];
        }
        updateBothCarts(updatedCart);
    };

    const increaseQty = (id) => {
        const updated = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
        updateBothCarts(updated);
    };

    const decreaseQty = (id) => {
        const updated = cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
            .filter(item => item.quantity > 0);
        updateBothCarts(updated);
    };

    const updateBothCarts = (updatedCart) => {
        setCart(updatedCart);
        saveCart(updatedCart);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Explore Products
                    </h2>
                    <p className="text-gray-500 mt-1 font-medium">Find everything you need right here.</p>
                </div>

                <div className="relative w-full md:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for groceries, tech, clothing..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-5 py-4 rounded-full bg-white border border-gray-200 text-gray-900 font-medium placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="bg-gray-100 rounded-3xl h-80 animate-pulse"></div>
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500 font-bold">No products found for "{search}"</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            cart={cart}
                            onAdd={addToCart}
                            onIncrease={increaseQty}
                            onDecrease={decreaseQty}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;