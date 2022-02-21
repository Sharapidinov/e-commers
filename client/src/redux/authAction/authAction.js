import Cookies from "js-cookie";
import {types} from "../types/ProductsType.js";

export const  singIn = (data) => {
    return {type: types.SING_IN, user: data.user, token: data.token}
}

export const signOut = () => {
    Cookies.remove("token", {path: ""})
    return {type: types.LOGOUT}
}