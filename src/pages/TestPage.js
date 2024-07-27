import React, { useState, useRef, useMemo } from "react";
import View360, { EquirectProjection, ControlBar } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import BasicLayout from '../layouts/BasicLayout';

const TestPage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageSrc(url);
        }
    };

    const projection = useMemo(() => {
        if (imageSrc) {
            return new EquirectProjection({ src: imageSrc });
        }
        return null;
    }, [imageSrc]);

    const controlBar = useMemo(() => new ControlBar({
        FullscreenButton: true,
    }), []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="mb-4"
            />
            {imageSrc && projection && (
                <div className="h-3/5 w-3/5">
                    <View360
                        className="is-16by9"
                        autoplay={true}
                        projection={projection}
                        plugins={[controlBar]}
                    />
                </div>
            )}
        </div>
    );
}

export default TestPage;
