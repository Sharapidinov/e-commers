import Main from "./page/Main";
import {Routes, Route} from "react-router-dom"
import Header from "./compnents/Header/Header";
import Cart from "./page/Cart";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRates} from "./redux/productsAction/productAction.js";
import SignUp from "./page/SignUp/SignUp.js";
import SignIn from "./page/Signin/SignIn.js";
import axios from "axios";
import { signOut, singIn} from "./redux/authAction/authAction.js";
import AddProducts from "./page/adminsPage/AddProducts.js";
import OnlyForUnUsers from "./compnents/OnlyForUnUsers.js";
import PrivateRoute from "./compnents/PrivateRoute.js";
import ProductPage from "./page/ProductPage/ProductPage.js";


function App() {
    const {isAuth, token} = useSelector(s => s.auth)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getRates())
    },[dispatch])


    useEffect(() => {
        if(token) {
            axios("/api/v1/auth/authenticate")
                .then(({data}) => {
                    dispatch(singIn(data))
                })
                .catch(e => {
                    dispatch(signOut())
                })

        }
    },[isAuth])


  return (
    <div>
        <Header/>
     <Routes>
         <Route path="/" element={<Main/>}/>
         <Route path="/basket" element={<Cart/>}/>
         <Route path="/product/:id" element={<ProductPage/>}/>
         <Route path="/signin" element={<OnlyForUnUsers><SignIn/></OnlyForUnUsers>}/>
         <Route path="/signup" element={<OnlyForUnUsers><SignUp/></OnlyForUnUsers>}/>
         <Route path="/private" element={<PrivateRoute roles={["admin"]}><AddProducts/></PrivateRoute>}/>
     </Routes>
    </div>
  );
}

export default App;

