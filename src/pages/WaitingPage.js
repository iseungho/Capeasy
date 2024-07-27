import React from 'react';
import { useParams } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import WaitingComponent from '../components/capeasy/WaitingComponent';

const WaitingPage = () => {
    
    const { vno } = useParams()

    return (
        <BasicLayout>
            <WaitingComponent vno={vno} />
        </BasicLayout>
    );
}

export default WaitingPage;