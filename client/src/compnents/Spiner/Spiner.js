import React from 'react';

const Spinner = () => {
    return (
        <div className="w-full h-96 flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"> </div>
        </div>

    );
};

export default Spinner;