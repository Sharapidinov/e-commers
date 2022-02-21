import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch} from "react-redux";
import {getProducts} from "../../redux/productsAction/productAction.js";

const AddProducts = () => {
    const dispatch = useDispatch()
    const {handleSubmit, reset ,register} = useForm()

    const addProducts = (data) => {
        if(data.title.trim() === "" && data.description.trim() === "") return alert("Please fill in all fields")
        console.log(data)
        const product = new FormData()
        product.append("title", data.title)
        product.append("description", data.description)
        product.append("price", data.price)
        product.append("image", data.image[0])


        axios({
            method: "post",
            url:"api/v1/products/add",
            headers: {"Content-Type" : "multipart/form-data"},
            data: product
        }).then(({data}) => {
            alert(data.message)
            dispatch(getProducts())
            reset()
        }).catch(e=> alert(e?.response?.data?.message || "Error"))
    }

    return (
        <form onSubmit={handleSubmit(addProducts)}>
            <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
                <div className=" bg-gray-400 rounded-md px-6 py-10 max-w-2xl mx-auto">
                    <h1 className="text-center text-2xl font-bold text-gray-900 mb-10">ADD POST</h1>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="text-lx font-serif">Title:</label>
                            <input {...register('title')} type="text" placeholder="title" id="title"
                                   className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-lg font-serif">Description:</label>
                            <textarea {...register('description')} id="description" cols="30" rows="10" placeholder="whrite here.."
                                      className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"> </textarea>
                        </div>
                        <div>
                            <label htmlFor="price" className="text-lx font-serif">Price:</label>
                            <input {...register('price')} type="number" placeholder="Price" id="price"
                                   className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="image" className="text-lx font-serif">Choose a image:</label>
                            <input  {...register('image')} type="file" id="image"
                                   className="ml-2 outline-none py-1 px-2 text-md rounded-md"/>
                        </div>
                        <button
                            className=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">ADD
                            ITEM
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddProducts;