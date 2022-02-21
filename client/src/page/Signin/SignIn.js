import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {singIn} from "../../redux/authAction/authAction.js";
import {useNavigate} from "react-router-dom";


const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const nav = useNavigate()

    const singInClick = () => {
        axios.post("/api/v1/auth/signin", {email, password})
            .then(({data})=>{
                dispatch(singIn(data))
                nav("/")
            } )
    }

    return (
        <div className="mt-10 to-indigo-600 flex justify-center items-center w-full">
            <form>
                <div className="bg-white px-10 py-8 rounded-xl w-screen border shadow-lg max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Sign in</h1>

                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
                            <input onChange={e => setEmail(e.target.value)} type="text" id="email" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">Password</label>
                            <input onChange={e => setPassword(e.target.value)} type="password" id="password" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"/>
                        </div>
                    </div>
                    <button
                        onClick={singInClick}
                        type="button"
                        className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;