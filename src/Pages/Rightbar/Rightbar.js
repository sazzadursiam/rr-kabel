import React from 'react';
import { Outlet } from 'react-router-dom';

const Rightbar = () => {
    return (
        <div>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default Rightbar;