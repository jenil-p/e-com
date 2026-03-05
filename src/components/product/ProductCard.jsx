function ProductCard({ product, onAdd }) {
    return (
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">

            <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mb-4"
            />

            <h3 className="font-semibold mb-2 line-clamp-2 text-black">
                {product.title}
            </h3>

            <p className="text-indigo-600 font-bold mb-4">
                ${product.price}
            </p>

            <button
                onClick={() => onAdd(product)}
                className="mt-auto bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
                Add to Cart
            </button>

        </div>
    );
}

export default ProductCard;