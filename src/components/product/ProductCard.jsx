function ProductCard({ product, cart, onAdd, onIncrease, onDecrease }) {

    const cartItem = cart.find(item => item.id === product.id);

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

            {!cartItem ? (

                <button
                    onClick={() => onAdd(product)}
                    className="mt-auto bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    Add to Cart
                </button>

            ) : (

                <div className="flex items-center justify-center gap-3 mt-auto">

                    <button
                        onClick={() => onDecrease(product.id)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    > - </button>

                    <span className="text-black font-semibold">
                        {cartItem.quantity}
                    </span>

                    <button
                        onClick={() => onIncrease(product.id)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    > + </button>

                </div>

            )}

        </div>
    );
}

export default ProductCard;