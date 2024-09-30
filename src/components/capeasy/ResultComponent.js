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
                const image = await getImage(ino); // JSON 형식의 응답 받기
                const base64Data = image.fileContent; // JSON 응답에서 base64 문자열을 가져옵니다.
                const blobUrl = createBase64DataToBlob(base64Data); // Blob URL 생성
                setProjection(new EquirectProjection({ src: blobUrl })); // EquirectProjection에 Blob URL 설정
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        loadImage();
    }, [ino]);

    const createBase64DataToBlob = (base64Data) => {
        const byteCharacters = atob(base64Data); // base64 문자열을 디코드
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' }); // 적절한 MIME 타입 설정
        return URL.createObjectURL(blob); // Blob URL로 변환
    };

    const handleDownloadClick = async (e) => {
        e.preventDefault();

        try {
            const image = await getImage(ino); // JSON 형식의 응답 받기
            const base64Data = image.fileContent; // JSON 응답에서 base64 문자열을 가져옵니다.
            const blobUrl = createBase64DataToBlob(base64Data); // Blob URL 생성

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'image'; // 다운로드 파일 이름 설정
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl); // URL 객체 해제
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