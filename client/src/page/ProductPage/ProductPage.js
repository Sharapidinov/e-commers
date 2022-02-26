import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/productsAction/productAction.js";
import Spinner from "../../compnents/Spiner/Spiner.js";


const ProductPage = () => {
    const [product, setProduct] = useState({})
    const {id} = useParams()
    const [text, setText] = useState('')
    const [spinner, setSpinner] = useState(true)
    const {rates, currentRate} = useSelector(s => s.products)
    const {user, isAuth} = useSelector(s => s.auth)
    const nav = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        axios(`/api/v1/products/${id}`)
            .then(({data}) => setProduct(data))
            .catch(e => console.log(e.response?.data?.message))
            .finally(() => setSpinner(false))
    }, [id])


    const sendComments = () => {
        const comment = {
            text,
            product: id,
            author: user?._id
        }
        axios.post('/api/v1/comments/add', comment)
            .then(({data}) => {
                setProduct({
                    ...product,
                    comments: [...product.comments, {...data.comment, author: {name: user.name}}]
                })
            })
            .catch(e => console.log(e.response?.data?.message))
    }

    const deleteProduct = (id) => {
        axios.delete(`/api/v1/products/delete/${id}`)
            .then(({data}) => {
                nav("/")
                dispatch(getProducts())
            })
            .catch(e => console.log(e.response?.data?.message))
    }

    const deleteComment = (_id) => {
        axios.delete(`/api/v1/comments/${_id}`)
            .then(({data}) => {
                    console.log(data.message)
                    setProduct({
                        ...product,
                        comments: [...product.comments.filter(it => it._id !== _id)]
                    })
                }
            )
            .catch(e => console.log(e.response?.data?.message))
    }


    if (spinner) return <Spinner/>
    return (
        <div className="lg:container h-3/4 bg-gray-600 m-auto p-5">
            <div className="items-center m-auto sm:w-1/2 text-center border-3 bg-gray-400 p-5 ">
                <div className="mb-3 m-auto text-center"><img className="w-1/2 m-auto" src={product.image} alt=""/>
                </div>
                <div>
                    <p>Name: {product?.title}</p>
                    {isAuth && user?.role === "admin" && <button onClick={() => deleteProduct(product._id)}
                                                                 className="px-6 py-2 text-gray-50 bg-red-700">Delete</button>}
                </div>
                <div>
                    <p className="mb-2">Price: {(product?.price * rates[currentRate[0]])?.toFixed(2)} {currentRate[1]} </p>
                </div>

                <div className="mb-3">
                    <span className="block">description:</span>
                    <p>{product?.description}</p>
                </div>


                {
                    isAuth && <div>
                        <div className="h-20 mb-3 p-1 px-10">
                            <textarea className="w-full border border-1 h-20 resize-none contenteditable p-2"
                                      onChange={e => setText(e.target.value)}> </textarea>

                        </div>

                        <button onClick={sendComments} className="bg-blue-700 px-6 py-2 active:bg-blue-300">Add
                            comment
                        </button>
                    </div>
                }


                <div className="text-left px-3">
                    <ul>
                        Comments:
                        {
                            product?.comments?.map(it => {
                                return <li
                                    className=" flex justify-between bg-white border-1 border-black rounded m-2 p-2">

                                    <div>
                                        <p>{it.text}</p>
                                        <p className="text-gray-500">{it?.author?.name}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => deleteComment(it._id)}
                                                className="px-6 py-2 text-gray-50 bg-red-700">Delete
                                        </button>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default ProductPage;