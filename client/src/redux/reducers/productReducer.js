import type from "../types/ProductsType";

const initialState = {
    products: [],
    cart: JSON.parse(localStorage.getItem("products")) ||  {},
    rates: {},
    currentRate: ["USD", "$"],
    sortByPrice: 1,
    sortByName: 1,
    searchState: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case type.GER_PRODUCTS:
            return{
                ...state,
                products: action.products
            }

        case type.UPDATE_CART:

            return {
                ...state,
                cart: action.cart
            }

        case type.GET_RATES:
            return {
                ...state,
                rates: action.rates
            }

        case type.CHANGE_RATE:
            return {
                ...state,
                currentRate: action.currentRate
            }

        case type.SORT_BY_PRICE:
            return {
                ...state,
                products:  action.products,
                cart: action.cart,
                sortByPrice: -state.sortByPrice
            }

        case type.SORT_BY_NAME:
        return {
            ...state,
            products:  action.products,
            cart: action.cart,
            sortByName: -state.sortByName
            }

        case type.SEARCH:
            return {
                ...state,
                searchState: action.searchState,
            }



        default: return state
    }
}

export default reducer