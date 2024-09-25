import React, { useMemo, useEffect, useState } from 'react';
import View360, { EquirectProjection, ControlBar } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import { getImage } from '../../api/videoApi';
import confetti from "canvas-confetti";
import useCustomMove from '../../hooks/useCustomMove';

const ResultComponent = ({ ino }) => {
    const { refresh } = useCustomMove();
    const [projection, setProjection] = useState(null);
    const controlBar = useMemo(() => new ControlBar({
        FullscreenButton: true,
    }), []);

    useEffect(() => {
        confetti({
            particleCount: 200,
            spread: 60,
        });
    }, [refresh]);

    useEffect(() => {
        // 이미지 로드 및 projection 설정
        const loadImage = async () => {
            try {
                const imageBlob = await getImage(ino); // Blob 형태의 이미지 데이터 가져오기
                const blobUrl = URL.createObjectURL(imageBlob);
                setProjection(new EquirectProjection({ src: blobUrl }));
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        loadImage();
    }, [ino]);

    const handleDownloadClick = async (e) => {
        e.preventDefault();

        try {
            const imageBlob = await getImage(ino); // Blob 형태의 이미지 데이터 가져오기
            const url = window.URL.createObjectURL(imageBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image'; // 다운로드 파일 이름 설정
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // URL 객체 해제
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center mt-36">
                <div className="h-2/3 w-2/3">
                    {projection && (
                        <View360
                            className="is-16by9"
                            autoplay={true}
                            projection={projection}
                            plugins={[controlBar]}
                        />
                    )}
                </div>
            </div>
            <div className="flex justify-center m-10">
                <button
                    onClick={handleDownloadClick}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-shadow shadow-md hover:shadow-lg"
                >
                    ⬇️ 원본 다운로드
                </button>
            </div>
        </div>
    );
};

export default ResultComponent;