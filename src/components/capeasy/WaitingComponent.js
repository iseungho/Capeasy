import React, { useState, useEffect } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { convertVideo } from '../api/videoApi';
import ErrorModal from './ErrorModal';

const WaitingComponent = ({ vno }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { moveToResult, refresh } = useCustomMove();

    useEffect(() => {
        setIsLoading(true);

        convertVideo(vno)
            .then((data) => {
                setIsLoading(false);
                moveToResult(data);
            })
            .catch((error) => {
                setError('업로드에 실패했습니다. 다시 시도해주세요!');
                setShowModal(true);
            });

    }, [vno, refresh, moveToResult]); // Ensure dependencies are correct

    const closeModal = () => {
        setShowModal(false);
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {isLoading ? (
                <div className="flex flex-col items-center">
                    <div className="loader"></div>
                    <div className="bg-loading-image px-12 py-12 w-[5vw] h-[5vh] bg-cover flex"></div>
                    <p className="mt-4 text-lg text-gray-700">추억을 기록하는 중 입니다...</p>
                </div>
            ) : (
                <p className="text-lg text-gray-700">이미지 파일 전송이 완료되었습니다!</p>
            )}
            {showModal && error && (
                <ErrorModal
                    message={error}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default WaitingComponent;