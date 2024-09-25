import React from 'react';
import BasicMenu from '../components/menus/BasicMenu';
import Footer from '../components/menus/Footer';

const BasicLayout = ({ children }) => {
    return (
        <>
            <BasicMenu />
            {children}
            <Footer />
        </>
    );
}

export default BasicLayout;
