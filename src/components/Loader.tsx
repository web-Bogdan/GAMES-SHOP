import React from 'react';
import "../styles/loader.scss";

//  App loader
const Loader: React.FC = () => {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;
