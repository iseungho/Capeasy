import React from 'react';
import BasicMenu from '../components/menus/BasicMenu';

const BasicLayout = ({ children }) => {
    return (
        <>
            <BasicMenu />
            {children}
        </>
    );
}

export default BasicLayout;
