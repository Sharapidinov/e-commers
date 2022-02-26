import React from 'react';

const ShowImg = ({it, setShow}) => {
    return (
        <div onClick={() => setShow(false)} className="bg-gray-800 z-10 bg-opacity-80 fixed inset-0 flex m-auto items-center justify-center">
            <div className=" w-1/2 m-auto flex justify-center items-center">
                <img className="w-3/4 h-3/4" src={it.image} alt=""/>
            </div>
        </div>
    );
};

export default ShowImg;