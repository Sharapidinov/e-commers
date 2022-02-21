import Cookies from "js-cookie"
import {types} from "../types/ProductsType.js"

const initialState = {
    user: null,
    token: Cookies.get("token"),
    isAuth: !!Cookies.get("token")
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SING_IN:
            return {
                ...state,
                user: action.user,
                token: action.token,
                isAuth: !!action.token,
            }
        case types.LOGOUT:
            return {
                ...state,
                user:null,
                token:null,
                isAuth: false
            }
        default: return state
    }
}

export default reducer