import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../redux/productsAction/productAction";
import ShowImg from "./ShowImg/ShowImg";
import {Link} from "react-router-dom";

const Card = ({it, count}) => {

    const [show,setShow] = useState(false)
    const dispatch = useDispatch()

    const {rates, currentRate} = useSelector(s => s.products)

    return (
        <div className=" card m-8 mx-auto bg-gray-300 rounded-lg pb-5 border-gray-800 border text-center">
            <img onClick={() => setShow(true)} className=" h-52 object-cover w-full rounded-lg mb-2" src={it.image} alt=""/>
            <div className="h-full">
                <Link className="hover:underline" to={`/product/${it._id}`}><p className="text-lg font-bold mb-2">Name: {it.title}</p></Link>
                <p className="mb-2">Price: {(it.price * rates[currentRate[0]]).toFixed(2)} {currentRate[1]} </p>
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => dispatch(removeFromCart(it))}
                        className="w-10 pt1 h-10 bg-red-400 text-3xl font-bold rounded-l-lg">-</button>
                    <span className=" w-20 pt-1 h-10 bg-gray-200 text-2xl">{count}</span>
                    <button onClick={()=> dispatch(addToCart(it))} className="w-10 pt1 h-10 bg-green-400 text-3xl font-semibold rounded-r-lg">+</button>
                </div>

            </div>
            {show && <ShowImg setShow={setShow} it={it}/>}
        </div>
    );
}

export default Card;