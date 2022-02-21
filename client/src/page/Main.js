import React, {useEffect} from 'react';

import Card from "../compnents/Card";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, search} from "../redux/productsAction/productAction";

const Main = () => {

    const dispatch = useDispatch()
    const {products, cart, searchState} = useSelector(s => s.products)

    useEffect(() => {
        dispatch(getProducts())
        dispatch(search(``))
    },[dispatch])

    return (
        <>
            {!products?.filter(it => it.title.toLowerCase().includes(searchState.toLowerCase()) || searchState.trim().value === "").length && <div className="text-center mt-10  text-2xl font-black">No results</div>}
            <div className="grid px-8 sm:px-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {

                    products?.filter(it => it.title.toLowerCase().includes(searchState.toLowerCase()) || searchState.trim().value === "").map(it => {
                        const count = cart[it._id]?.count || 0

                        return (
                            <Card key={it._id} count={count} it={it}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Main;