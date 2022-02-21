import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const OnlyForUnUsers = ({children}) => {
    const {isAuth} = useSelector((s) => s.auth)
    return (
        !isAuth
            ? children
            : <Navigate to={"/"}/>
    );
};

export default OnlyForUnUsers;