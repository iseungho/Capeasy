import React, { useMemo, useEffect, useState } from 'react';
import View360, { EquirectProjection, ControlBar } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import { API_SERVER_HOST } from "../../api/videoApi";
import confetti from "canvas-confetti";
import useCustomMove from '../../hooks/useCustomMove';
import WriteModal from "../common/WriteModal";  // WriteModal 임포트

const host = API_SERVER_HOST;

const ResultComponent = ({ ino }) => {
    const { moveToBoardList, refresh } = useCustomMove();
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 모달 상태 추가

    useEffect(() => {
        confetti({
            particleCount: 200,
            spread: 60,
        });
    }, [refresh]);

    const projection = useMemo(() => new EquirectProjection({
        src: `${host}/api/images/view/${ino}`,
    }), [ino]);

    const controlBar = useMemo(() => new ControlBar({
        FullscreenButton: true,
    }), []);

    const handleDownloadClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/images/view/${ino}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image'; // Default filename for downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Clean up
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    // 글 작성 버튼 클릭 시 모달 열기
    const handleWriteClick = () => {
        setIsWriteModalOpen(true);
    };

    // 모달 닫기
    const handleCloseWriteModal = () => {
        setIsWriteModalOpen(false);
        moveToBoardList();
    };

    return (
        <div>
            <div className="flex justify-center items-center mt-36">
                <div className="h-1/2 w-1/2">
                    <View360
                        className="is-16by9"
                        autoplay={true}
                        projection={projection}
                        plugins={[controlBar]}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <button
                    onClick={handleDownloadClick}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-shadow shadow-md hover:shadow-lg"
                >
                    ⬇️ 원본 다운로드
                </button>
            </div>

            <div className="flex justify-center mt-10">
                <button
                    onClick={handleWriteClick}  // 글 작성 버튼 클릭 시 모달 열기
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-shadow shadow-md hover:shadow-lg"
                >
                    🖋️ 글 작성
                </button>
            </div>

            {/* WriteModal 추가 */}
            {isWriteModalOpen && (
                <WriteModal isOpen={isWriteModalOpen} onClose={handleCloseWriteModal} ino={ino} />
            )}
        </div>
    );
};

export default ResultComponent;
