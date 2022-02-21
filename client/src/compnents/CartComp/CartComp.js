import React, {useState} from 'react';
import {addToCart, removeFromCart, deleteAllFromCart} from "../../redux/productsAction/productAction";
import {useDispatch, useSelector} from "react-redux";
import {RiDeleteBin2Line} from "react-icons/ri"
import ShowImg from "../ShowImg/ShowImg";

const CartComp = ({it}) => {
    const {rates, currentRate} = useSelector(s => s.products)

    const [show,setShow] = useState(false)
    const dispatch = useDispatch()
    return (
        <tr className="text-gray-700">
            <td className="px-4 py-3 border">
                <div className="md:flex w-30 items-center text-sm">
                    <div className="relative md:w-12 md:h-12 mr-3 rounded-full md:block">
                        <img
                            onClick={() => setShow(true)}
                            className="object-cover w-full h-full rounded-full"
                             src={it.image}
                             alt="" loading="lazy"/>

                    </div>
                    <div>
                        <p className="font-semibold text-black">{it.title}</p>
                        <p className="text-xs text-gray-600">Price : {(it.price * rates[currentRate[0]]).toFixed(2)} {currentRate[1]}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-ms font-semibold border">
                <div className="md:flex text-center  items-center justify-center ">
                    <div className="flex mb-2 md:mb-0 mr-6">
                        <button
                            onClick={() => dispatch(removeFromCart(it))}
                            className="w-10 pt1 h-10 bg-red-400 text-3xl font-bold rounded-l-lg">-
                        </button>
                        <span className="w-10 md:w-20 pt-1 h-10 bg-gray-200 text-center text-2xl">{it.count}</span>
                        <button onClick={() => dispatch(addToCart(it))}
                                className="w-10 pt1 h-10 bg-green-400 text-3xl font-semibold rounded-r-lg">+
                        </button>
                    </div>

                    <button
                        onClick={() => dispatch(deleteAllFromCart(it._id))}
                        className="rounded-xl py-2 text-2xl w-3/4 md:w-12 bg-red-600 flex items-center justify-center">
                        <RiDeleteBin2Line/>
                    </button>
                </div>
            </td>
            <td className="px-4 py-3 text-xs border">
                            <span
                                className="px-2 py-1 text-lg font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"

                            >

                                {
                                    (it.count * it.price * rates[currentRate[0]]).toFixed(2)
                                } {currentRate[1]}
                            </span>
            </td>
            {show && <ShowImg setShow={setShow} it={it}/>}
        </tr>
    );
};

export default CartComp;