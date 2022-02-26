import React, {useState} from 'react';
import {changeRate, search, sortByName, sortByPrice} from "../../redux/productsAction/productAction";
import {useDispatch, useSelector} from "react-redux";
import {GiHamburgerMenu} from "react-icons/gi";
import {Link} from "react-router-dom";
import {signOut} from "../../redux/authAction/authAction.js";

const BurgerMenu = ({setBurger, burger}) => {
    const {isAuth} = useSelector(s => s.auth)
    const dispatch = useDispatch()
    const [inp, setInp] = useState("")

    const clickChangeRate = (rate) =>{
        dispatch( changeRate(rate) )
        setBurger(false)
    }

    const clickSortByPrice = () => {
        dispatch(sortByPrice())
        setBurger(false)
    }

    const clickSortByName = () => {
        dispatch(sortByName())
        setBurger(false)
    }
    const searchInp = (e) => {
        dispatch(search(e.target.value))
        setInp(e.target.value.trim())
    }

    const logOutClick = () => {
      dispatch(signOut())
        setBurger(false)
    }

    return (
       <div onClick={() => setBurger(false)} className="fixed z-50 inset-0">
           <div onClick={(e) => e.stopPropagation()} className="fixed top-0 right-0 md:w-1/4 p-4 bg-yellow-600  ">
               {!inp &&
              <>
                  <div className=" text-right pt-2 pl-2 pr-6 mb-8">
                      <button onClick={() => setBurger(!burger)} className="py-2 px-2 z-60 text-xl bg-blue-400 rounded-xl"><GiHamburgerMenu/></button>
                  </div>

                  {
                      !isAuth
                          ? <div className="flex  mb-6 justify-around ">
                              <Link className="bg-blue-400 py-2 px-1 text-lg font-bold rounded-md" to={"/signin"}>Sign in</Link>
                              <Link className="bg-blue-400 py-2 px-1 text-lg font-bold rounded-md" to={"signup"}>Sign up</Link>
                          </div>
                          : <div className="flex mb-6 justify-around ">
                              <button onClick={logOutClick} className="bg-blue-400 w-1/2 py-2 px-1 text-lg font-bold rounded-md">Exit</button>
                          </div>
                  }


                  <div className="flex  mb-6 justify-around ">
                      <button className="bg-blue-400 py-2 px-1 text-lg font-bold rounded-md" onClick={() => clickChangeRate(["USD", "$"])}>USD</button>
                      <button className="bg-blue-400 py-2 px-1 text-lg font-bold rounded-md" onClick={() => clickChangeRate(["RUB", "руб"])}>RUB</button>
                      <button className="bg-blue-400 py-2 px-1 text-lg font-bold rounded-md" onClick={() => clickChangeRate(["KGS", "сом"])}>KGS</button>
                  </div>

                  <div className="text-center flex items-center text-center justify-center ">
                      <span className="bg-gray-400 rounded-md w-3/4 mb-5 font-bold text-lg">Sort by:</span>
                  </div>
                  <div className="flex flex justify-around mb-5 ">
                      <button onClick={() => clickSortByPrice()} className="bg-blue-400 py-2 px-1 text-lg font-bold rounded-md">Price</button>
                      <button onClick={() => clickSortByName()} className="bg-blue-400 py-2 px-1 text-lg font-bold rounded-md">Name</button>
                  </div>
              </> }

               <div className="text-center m-auto flex items-center text-center justify-center ">
                   <input onChange={(e) => searchInp(e)} className="text-center w-3/4  p-3 rounded-md" placeholder="Search" type="text"/>
               </div>
           </div>
       </div>
    )
}

export default BurgerMenu;