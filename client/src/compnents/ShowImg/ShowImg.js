import React from 'react';

const ShowImg = ({it, setShow}) => {
    return (
        <div onClick={() => setShow(false)} className="bg-gray-800 z-10 bg-opacity-80 fixed inset-0 flex items-center justify-center">
            <div>
                <img src={it.image} alt=""/>
            </div>
        </div>
    );
};

export default ShowImg;