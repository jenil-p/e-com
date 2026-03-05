function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    return (
        <div className="flex items-center gap-4 border p-4 rounded-lg">

            <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 object-contain"
            />

            <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-indigo-600 font-bold">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onDecrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    -
                </button>

                <span>{item.quantity}</span>

                <button
                    onClick={() => onIncrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    +
                </button>
            </div>

            <button
                onClick={() => onRemove(item.id)}
                className="text-red-500"
            >
                Remove
            </button>

        </div>
    );
}

export default CartItem;