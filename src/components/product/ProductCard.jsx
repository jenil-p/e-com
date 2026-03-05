import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosAdd } from "react-icons/io";
import { LuMinus } from "react-icons/lu";

function ProductCard({ product, cart, onAdd, onIncrease, onDecrease }) {
    const cartItem = cart.find(item => item.id === product.id);

    return (
        <div className="group bg-white rounded-3xl p-4 sm:p-5 shadow-lg shadow-gray-200/40 border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-100">

            <div className="relative aspect-square w-full bg-gray-50 rounded-2xl mb-5 overflow-hidden flex items-center justify-center p-6">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl font-black text-gray-900 shadow-sm border border-gray-100/50">
                    ${product.price}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">
                    {product.title}
                </h3>

                <div className="flex justify-between items-center">

                    {/* tag */}
                    <p className="text-sm font-medium text-gray-400 capitalize">
                        {product.category}
                    </p>

                    {/* add / select the quantity */}
                    <div className="mt-auto">
                        {!cartItem ? (
                            <button
                                onClick={() => onAdd(product)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all duration-200 transform active:scale-95 shadow-lg shadow-emerald-600/30 flex items-center justify-center"
                            >
                                <HiOutlineShoppingBag />
                            </button>
                        ) : (
                            <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-1.5 flex items-center justify-between shadow-inner">
                                <div
                                    onClick={() => onDecrease(product.id)}
                                    className="h-auto w-auro bg-black p-1 rounded-full"
                                >
                                    <LuMinus className="text-white"/>
                                </div>

                                <span className="text-gray-900 font-black text-lg w-8 text-center">
                                    {cartItem.quantity}
                                </span>

                                <div
                                    onClick={() => onIncrease(product.id)}
                                    className="h-auto w-auro bg-black p-1 rounded-full"
                                >
                                    <IoIosAdd className="text-white"/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ProductCard;