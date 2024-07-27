import React, { useMemo } from 'react';
import View360, { EquirectProjection, ControlBar } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import { API_SERVER_HOST } from "../api/videoApi";
import confetti from "canvas-confetti";

const host = API_SERVER_HOST;

const ResultComponent = ({ ino }) => {

    const projection = useMemo(() => new EquirectProjection({
        src: `${host}/api/images/view/${ino}`,
    }), []);

    const controlBar = useMemo(() => new ControlBar({
        FullscreenButton: true,
    }), []);

    const handleConfettiClick = () => {
        confetti({
            particleCount: 200,
            spread: 60,
        });
    };

    const handleDownloadClick = () => {
        handleConfettiClick();
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="h-3/5 w-3/5">
                <View360
                    className="is-16by9"
                    autoplay={true}
                    projection={projection}
                    plugins={[controlBar]}
                />
            </div>
            <a
                href={`${host}/api/images/view/${ino}`}
                download
                onClick={handleDownloadClick}
                className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-shadow shadow-md hover:shadow-lg"
            >
                ⬇️ 원본 다운로드
            </a>
        </div>
    );
};

export default ResultComponent;
