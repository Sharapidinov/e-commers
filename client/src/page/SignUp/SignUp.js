import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {

    const nav = useNavigate()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    console.log({email, name, password})
    const singUpClick = () => {
        axios.post("/api/v1/auth/signup", {email, name, password})
            .then(({data}) => {
                alert(data?.message)
                nav("/signin")
            })
            .catch(e => alert(e.response?.data?.message))

    }



    return (
        <div className="mt-10 to-indigo-600 flex justify-center items-center w-full">
            <form>
                <div className="bg-white px-10 py-8 rounded-xl w-screen border shadow-lg max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Register</h1>
                        <div>
                            <label htmlFor="name" className="block mb-1 text-gray-600 font-semibold">Username</label>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)}  type="text" id="email" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)}  type="password" id="password" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"/>
                        </div>
                    </div>
                    <button
                        onClick={() => singUpClick()}
                        type="button"
                        className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;