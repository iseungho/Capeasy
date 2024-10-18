import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AboutComponent = () => {
    const [selected, setSelected] = useState('Tech');
    const refs = {
        Tech: useRef(null),
        TechImage: useRef(null),
        Design: useRef(null),
        DesignImage: useRef(null),
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const section = Object.keys(refs).find(
                            (key) => refs[key].current === entry.target
                        );
                        if (section) setSelected(section);
                    }
                });
            },
            { threshold: 0.5 }
        );

        // 요소가 존재할 때만 observe 호출
        Object.values(refs).forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative bg-white select-none">
            <div className="container relative mx-auto px-4 py-10 z-10 flex flex-col items-center">
                <div className="w-full flex flex-col md:flex-row items-start justify-center">

                    {/* Content Section */}
                    <div className="flex-grow text-center">
                        <div ref={refs.Tech} className="h-screen flex items-center justify-center px-4 md:px-0">
                            <motion.div
                                initial="hidden"
                                animate={selected === 'Tech' ? 'visible' : 'hidden'}
                                variants={variants}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-3xl font-extrabold text-green-700 mb-2">IMAGE STITCHING</h1>
                                <h2 className="text-3xl sm:text-xl md:text-5xl lg:text-5xl font-semibold mb-4">
                                    공간 이미지를 제작하는 기술, 한계를 뛰어넘다.
                                </h2>
                            </motion.div>
                        </div>

                        <div ref={refs.TechImage} className="md:h-screen relative flex items-center justify-center">
                            <motion.div
                                initial="hidden"
                                animate={selected === 'TechImage' || selected === 'Design' ? 'visible' : 'hidden'}
                                variants={variants}
                                transition={{ duration: 1.5 }}
                                className="w-full h-full rounded-lg overflow-hidden"
                            >
                                <div className="relative bg-white select-none py-10">
                                    {/* 배경 이미지 */}
                                    <div className="absolute inset-0 bg-cover bg-center bg-about-image opacity-80 -z-10" />

                                    {/* 콘텐츠와 배경을 감싸는 그리드 */}
                                    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        {/* 이미지 영역 */}
                                        <div className="relative flex justify-center items-center">
                                            <div className="relative w-full h-64 md:h-[28rem] rounded-lg bg-capture-image bg-contain bg-no-repeat bg-center"></div>

                                        </div>


                                        {/* 텍스트 설명 영역 */}
                                        <div className="flex flex-col justify-center space-y-6 overflow-y-auto">
                                            <h1 className="text-3xl font-bold text-green-700">
                                                IMAGE STITCHING
                                            </h1>
                                            <p className="text-lg font-semibold leading-relaxed break-words">
                                                이미지 스티칭은 두 이미지의 공통된 특징점을 찾아 이어붙이는 기술입니다.
                                            </p>
                                            <p className="text-lg font-semibold leading-relaxed break-words">
                                                기존 스티칭 기술은 왜곡 문제로 인한 정교한 촬영을 요구하는 한계가 존재했습니다.
                                            </p>
                                            <p className="text-lg font-semibold leading-relaxed break-words">
                                                Capeasy는 영상에서 프레임을 추출해 자연스러운 이미지를 형성하고,
                                                SRCNN-PANO를 사용해 스티칭의 한계를 극복합니다.
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                출처: <a
                                                    href="http://viplab.fudan.edu.cn/vip/attachments/download/1992/Automatic_Panoramic_Image_Stitching_using_Invariant_Features.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline hover:text-gray-700"
                                                >
                                                    Automatic Panoramic Image Stitching using Invariant Features
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div ref={refs.Design} className="h-screen flex items-center justify-center">
                            <motion.div
                                initial="hidden"
                                animate={selected === 'Design' ? 'visible' : 'hidden'}
                                variants={variants}
                                transition={{ duration: 1.5 }}
                            >
                                <h1 className="text-3xl font-extrabold text-green-700 mb-2">SRCNN-PANO</h1>
                                <h2 className="text-3xl sm:text-xl md:text-5xl lg:text-5xl font-semibold mb-4">
                                    CAPEASY만의 독자적 초해상화 기술
                                </h2>
                            </motion.div>
                        </div>

                        <div ref={refs.DesignImage} className="md:h-screen relative flex items-center justify-center">
                            <motion.div
                                initial="hidden"
                                animate={selected === 'DesignImage' ? 'visible' : 'hidden'}
                                variants={variants}
                                transition={{ duration: 1.5 }}
                                className="w-full h-full rounded-lg overflow-hidden"
                            >
                                <div className="relative bg-white select-none py-10">
                                    {/* 배경 이미지 */}
                                    <div className="absolute inset-0 bg-cover bg-center bg-about-image opacity-80 -z-10" />

                                    {/* 콘텐츠와 배경을 감싸는 그리드 */}
                                    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                                        {/* 이미지 영역, 모바일에서는 위에 보이게 설정 */}
                                        <div className="relative flex justify-center items-center order-first md:order-none">
                                            <div className="relative w-full h-64 md:h-[28rem] rounded-lg bg-filter-image bg-contain bg-no-repeat bg-center"></div>
                                        </div>

                                        {/* 텍스트 설명 영역 */}
                                        <div className="flex flex-col justify-center space-y-6 overflow-y-auto">
                                            <h1 className="text-3xl font-bold text-green-700">
                                                SRCNN-PANO
                                            </h1>
                                            <p className="text-lg font-semibold leading-relaxed break-words">
                                                Capeasy는 기존 AI 초해상화 기술인 SRCNN을 개선한 SRCNN-PANO를 사용합니다.
                                            </p>
                                            <p className="text-lg font-semibold leading-relaxed break-words">
                                                프레임들은 SRCNN-PANO 필터를 거쳐 더 선명한 이미지를 생성합니다.
                                            </p>
                                            <button
                                                className="w-40 py-2 px-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition self-center"
                                            >
                                                자세히 보기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;
