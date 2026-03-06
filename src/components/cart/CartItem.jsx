import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

function CartItem({ item, onIncrease, onDecrease }) {
    return (
        <div className="flex flex-row items-center gap-4 sm:py-4 w-full border-b border-gray-100 last:border-0">

            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain mix-blend-multiply p-2"
                />
            </div>

            <div className="flex flex-row max-sm:flex-col flex-1 min-w-0 justify-center items-center gap-3">

                {/* Top: Title & Unit Price */}
                <div className="flex flex-col w-full">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 w-full line-clamp-2">
                        {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                        ${Number(item.price).toFixed(2)}
                    </p>
                </div>

                {/* +/- and price */}
                <div className="flex flex-col items-end justify-center w-full mt-auto">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center gap-2 border border-gray-200 rounded-full bg-white px-2 py-1">
                            <div
                                onClick={() => onDecrease(item.id)}
                                className="flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                            >
                                <CiCircleMinus className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>

                            <span className="w-6 text-center text-xs sm:text-sm font-medium text-gray-900 select-none">
                                {item.quantity}
                            </span>

                            <div
                                onClick={() => onIncrease(item.id)}
                                className="flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                            >
                                <CiCirclePlus className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                        </div>

                        {/* Total Price */}
                        <div className="text-sm sm:text-base font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CartItem;