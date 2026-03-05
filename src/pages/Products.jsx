import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/product/ProductCard";
import { getCart, saveCart } from "../utils/storage";

function Products() {

    const [products, setProducts] = useState([]);
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

    }, []);

    const addToCart = (product) => {

        let cart = getCart();

        const exists = cart.find(item => item.id === product.id);

        if (exists) { // this aviods duplicate products in a single cart at same time.
            cart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        saveCart(cart);

        alert("Added to cart!");
    };

    if (loading) {
        return <div className="p-10">Loading products...</div>;
    }

    return (
        <div className="p-10">

            <h2 className="text-2xl font-bold mb-6">
                Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={addToCart}
                    />
                ))}
            </div>
            
        </div>
    );
}

export default Products;