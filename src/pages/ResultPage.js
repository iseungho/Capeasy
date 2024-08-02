import React from 'react';
import { useParams } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import ResultComponent from '../components/capeasy/ResultComponent';

const ResultPage = () => {
    
    const { ino } = useParams()

    return (
        <BasicLayout>
            <ResultComponent ino={ino} />
        </BasicLayout>
    );
}

export default ResultPage;