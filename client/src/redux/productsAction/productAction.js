import action from "../types/ProductsType"
import {store} from "../index";

import axios from "axios";


export const getProducts = () => {
    return (dispatch) => {
        axios(`api/v1/products/get-all`)
            .then(({data}) => dispatch({type: action.GER_PRODUCTS, products:data}))
    }
}

export const addToCart = (product) => {
    const  cart = {...store.getState()?.products.cart}
    let newCart
    if(cart[product._id]){
        newCart = {...cart, [product._id]: {...product, count: cart[product._id].count + 1 }}
    } else {
        newCart = {...cart, [product._id]: {...product, count:1}}
    }
    localStorage.setItem("products", JSON.stringify(newCart))

    return{type:action.UPDATE_CART, cart: newCart}
}

export const removeFromCart = (product) => {
    let  cart = {...store.getState()?.products.cart}
    console.log(cart)

    if(cart[product._id] && cart[product._id]?.count > 1 ){
        cart = {...cart, [product._id]: {...product, count: cart[product._id].count - 1 }}
    } else {
        delete cart[product._id]
    }
    localStorage.setItem("products", JSON.stringify(cart))

    return {type: action.UPDATE_CART, cart}

}

export const deleteAllFromCart = (id) => {
    let  cart = {...store.getState()?.products.cart}
    delete cart[id]
    localStorage.setItem("products", JSON.stringify(cart))

    return {type: action.UPDATE_CART, cart}

}

export const clearCart = () => {
    localStorage.removeItem("products")
    return {type: action.UPDATE_CART, cart: {}}

}

export const getRates = () => {
    return (dispatch) => {
        axios(`https://api.exchangerate.host/latest?base=USD&symbols=RUB,KGS,USD`)
            .then(({data}) => dispatch({type: action.GET_RATES, rates: data.rates}))
    }
}

export const changeRate = (rate) => {
    return {type: action.CHANGE_RATE, currentRate: rate}
}

export const sortByPrice = () => {
    return (dispatch , getState) => {
        const store = getState()
        const {sortByPrice, products, cart} = store.products
        let sortedProducts
        let sortedCart
        if(sortByPrice > 0 ){
            sortedProducts = products.sort((a,b) => a.price - b.price)
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => a[1].price - b[1].price))
        } else {
            sortedProducts = products.sort((a,b) => b.price - a.price)
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => b[1].price - a[1].price))

        }

        dispatch({type: action.SORT_BY_PRICE, products:sortedProducts, cart:sortedCart})
    }
}

export const sortByName = () => {
    return (dispatch , getState) => {
        const store = getState()
        const {sortByName, products, cart} = store.products
        let sortedProducts
        let sortedCart
        if(sortByName > 0 ){
            sortedProducts = products.sort((a,b) => (a.title).localeCompare(b.title) )
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => (a[1].title).localeCompare(b[1].title) ))
        } else {
            sortedProducts = products.sort((a,b) => (b.title).localeCompare(a.title) )
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => (b[1].title).localeCompare(a[1].title) ))

        }
        dispatch({type: action.SORT_BY_NAME, products:sortedProducts, cart:sortedCart})
    }
}


export const search = (name) => {
     return ({type: action.SEARCH, searchState: name })
}