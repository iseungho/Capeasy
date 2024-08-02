import React, { useEffect, useMemo, useState } from "react";
import View360, { EquirectProjection, ControlBar } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import BasicLayout from '../layouts/BasicLayout';
import confetti from "canvas-confetti";
import useCustomMove from "../hooks/useCustomMove";

const TestPage = () => {
    const { refresh } = useCustomMove();
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        confetti({
            particleCount: 200,
            spread: 60,
        });
    }, [refresh]);

    useEffect(() => {
        // 로컬 파일 경로 읽기
        const filePath = 'C:/CapstoneDesign/anywhere/src/asset/images/test.jpg';
        fetch(filePath)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result);
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => console.error('File read failed:', error));
    }, []);

    const projection = useMemo(() => new EquirectProjection({
        src: imageSrc,
    }), [imageSrc]);

    const controlBar = useMemo(() => new ControlBar({
        FullscreenButton: true,
    }), []);

    const handleDownloadClick = async (e) => {
        e.preventDefault();

        try {
            const link = document.createElement('a');
            link.href = imageSrc;
            link.download = 'test.jpg'; // Default filename for downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <BasicLayout>
            <div>
                <div className="flex justify-center items-center mt-36">
                    <div className="h-1/2 w-1/2">
                        {imageSrc && (
                            <View360
                                className="is-16by9"
                                autoplay={true}
                                projection={projection}
                                plugins={[controlBar]}
                            />
                        )}
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
            </div>
        </BasicLayout>
    );
}

export default TestPage;
