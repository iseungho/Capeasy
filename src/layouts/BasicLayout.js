import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function BasicLayout({ children }) {

    const navigate = useNavigate();

    const handleClickLogo = useCallback(() => {
        navigate({ pathname: `/` });
    }, [navigate]);

    return (
        <div>
            <header className="bg-white shadow fixed w-full top-0 left-0 z-50">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <nav className="space-x-1">
                        <button
                            className="bg-logo-image bg-cover w-48 h-16 font-bold text-blue-500"
                            onClick={handleClickLogo}
                        ></button>
                    </nav>
                    <nav className="space-x-4">
                        <a href="#" className="bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 flex-1 shadow-md hover:shadow-lg transition-shadow">Login</a>
                    </nav>
                </div>
            </header>
            {children}
        </div>
    );
}

export default BasicLayout;
