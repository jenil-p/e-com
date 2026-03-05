import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/product/ProductCard";
import { getCart, saveCart } from "../utils/storage";

import toast from "react-hot-toast";

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

        let cart = getCart();
        let updatedCart = [...cart];

        const exists = updatedCart.find(item => item.id === product.id);

        if (exists) { // this aviods duplicate products in a single cart at same time.
            updatedCart = updatedCart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart(updatedCart);
    };

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        saveCart(updatedCart);
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

    if (loading) {
        return <div className="p-10">Loading products...</div>;
    }

    // search thing...
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-10">

            <h2 className="text-2xl font-bold mb-6">
                Products
            </h2>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded mb-6 w-full max-w-md"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

        </div>
    );
}

export default Products;