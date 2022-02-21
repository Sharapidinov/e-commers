import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi"
import BurgerMenu from "../BurgerMenue/BurgerMenu";
import {CSSTransition} from "react-transition-group";
import {useSelector} from "react-redux";

const Header = () => {
    const {user} = useSelector(s => s.auth)
    const [burger, setBurger] = useState(false)

    return (
       <>
           <header className="flex p-6 bg-yellow-600 justify-between items-center	">
               <div className="text-center">
                   <Link className="mr-6" to={`/`}>Main</Link>
                   <Link className="mr-6" to={`/basket`} >Basket</Link>
                   {user?.role === "admin" &&  <Link  to={`/private`} >Add product</Link>}
               </div>

               <div className="flex text-center items-center">
                   {
                       user && <div className=" z-80 text-blue-800 text-lg">
                         {user?.name}
                       </div>
                   }
                   <button onClick={() => setBurger(!burger)} className="py-2 px-2 ml-9 z-60 text-xl bg-blue-400 rounded-xl"><GiHamburgerMenu/></button>
               </div>
           </header>

           <CSSTransition
           in={burger}
           timeout={300}
           classNames="burger"
           unmountOnExit
           >
               <BurgerMenu burger={burger} setBurger={setBurger} />
           </CSSTransition>
       </>
    );
};

export default Header;
