import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import CartComp from "../compnents/CartComp/CartComp";
import {clearCart} from "../redux/productsAction/productAction";


const Cart = () => {

    const {cart, rates,currentRate} = useSelector(s => s.products)
    const dispatch = useDispatch()

    return (

    <section className="container mx-auto p-6 font-mono">
        {
            !!Object.keys(cart).length
            ? <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full">
                        <table className="w-full">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3 w-96">Title</th>

                                <th className="px-4 py-3">Quantity</th>
                                <th className="px-4 py-3">Total cost</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {
                                Object.values(cart).map(it=> {
                                    return(
                                        <CartComp key={it.id} it={it} />
                                    )
                                })

                            }
                            </tbody>
                            <tfoot>
                            <tr className="text-gray-700">
                                <td className="px-4 py-3 border">

                                </td>
                                <td className="px-4 py-3 text-ms font-semibold border text-center">
                                    <button
                                        onClick={() => dispatch( clearCart() )}
                                        className="px-6 py-2 md:w-1/2 bg-red-800 rounded-xl text-white"
                                    >
                                        Clear cart
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-xs border">

                            <span  className="px-2 py-1 text-2xl font-semibold  leading-tight text-green-700 bg-green-100 rounded-sm">
                                Total: &nbsp;
                                {
                                    Object.values(cart).reduce((acc,it) => {
                                        return +(acc + it.price * rates[currentRate[0]] * it.count).toFixed(2)
                                    },0)
                                } {currentRate[1]}
                            </span>

                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                : <div className="text-center text-2xl font-black">Cart is empty</div>
        }
    </section>
    )
}

export default Cart;