import React from 'react';
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux";

const PrivateRoute = ({children, roles=[]}) => {

    const {isAuth, user} = useSelector((s) => s.auth)
    const access = roles.includes(user?.role)
    return (
        isAuth && access
            ? children
            : <Navigate to={"/"}/>
    );
};

export default PrivateRoute;