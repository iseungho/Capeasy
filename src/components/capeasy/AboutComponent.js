import React from 'react';
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const AboutComponent = () => {

    const { ref: aboutSloganRef, inView: aboutSloganInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: sloganRef1, inView: sloganInView1 } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: sloganRef2, inView: sloganInView2 } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="min-h-screen bg-white mt-24 relative">
            {/* Background Image with Gradient */}
            <div className="absolute inset-0 -mt-5 bg-cover bg-center bg-about-image opacity-50">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 text-start relative z-20 mt-32 sm:mt-64">
                <motion.h1
                    ref={aboutSloganRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: aboutSloganInView ? 1 : 0,
                        y: aboutSloganInView ? 0 : 20,
                    }}
                    transition={{ duration: 2 }}
                    className="text-5xl sm:text-6xl font-extrabold mt-10 sm:mt-20 sm:text-start text-center">
                    WHY CAPEASY
                </motion.h1>
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 py-10 sm:py-16 z-10 mt-16 sm:mt-0">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Left Section */}
                    <div className="md:w-1/2 w-full text-center md:text-left mb-8 md:mb-0">
                        <motion.h1
                            ref={sloganRef1}
                            className="text-xl sm:text-2xl font-extrabold text-green-700 mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            기술
                        </motion.h1>
                        <motion.h1
                            ref={sloganRef1}
                            className="text-xl sm:text-3xl font-semibold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            독자적으로 개발한 SRCNN 필터 기술
                        </motion.h1>
                        <motion.p
                            ref={sloganRef1}
                            className="text-xs sm:text-2xl sm:mt-6 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            Capeasy는 저희만의 초해상화 공간 이미지를 제작해드립니다.
                        </motion.p>
                    </div>

                    {/* Right Section - Full Image Display */}
                    <div className="md:w-1/2 w-full">
                        <motion.div
                            ref={sloganRef1}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            <div className="w-full h-64 sm:h-80 rounded-lg shadow-lg overflow-hidden">
                                <div className="bg-filter-image bg-[length:380px_260px] sm:bg-cover bg-center w-full h-full object-contain"></div>
                            </div>
                        </motion.div>
                        <motion.p
                            ref={sloganRef1}
                            className="text-xs sm:text-lg font-extrabold mt-3 leading-relaxed items-center text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            SRCNN 기반의 자체 개발한 모델(SRCNN-PANO)의 구조와
                        </motion.p>
                        <motion.p
                            ref={sloganRef1}
                            className="text-xs sm:text-lg font-extrabold leading-relaxed items-center text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            사용된 프로세서 및 운영체제 버전(좌), 학습 모델 추론 영상 품질 성능평가(우)
                        </motion.p>
                    </div>

                </div>
            </div>

            {/* Second Section with additional feature descriptions */}
            <div className="relative container mx-auto px-4 py-10 sm:py-16 z-10">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Left Section */}
                    <div className="md:w-1/2 w-full text-center md:text-left mb-8 md:mb-0">
                        <motion.h1
                            ref={sloganRef2}
                            className="text-xl sm:text-2xl font-extrabold text-green-700 mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView2 ? 1 : 0,
                                y: sloganInView2 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            경쟁력
                        </motion.h1>
                        <motion.h1
                            ref={sloganRef2}
                            className="text-xl sm:text-3xl font-semibold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView2 ? 1 : 0,
                                y: sloganInView2 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            동영상 하나로 만드는 공간 이미지 스티칭
                        </motion.h1>
                        <motion.p
                            ref={sloganRef2}
                            className="text-xs sm:text-2xl sm:mt-6 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView2 ? 1 : 0,
                                y: sloganInView2 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            별도의 장비를 구매 할 필요 없이
                        </motion.p>
                        <motion.p
                            ref={sloganRef2}
                            className="text-xs sm:text-2xl sm:mb-6 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView2 ? 1 : 0,
                                y: sloganInView2 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            핸드폰으로 촬영한 영상을 이용하여 손쉽게 제작이 가능합니다.
                        </motion.p>
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 w-full">
                        <motion.div
                            ref={sloganRef2}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView2 ? 1 : 0,
                                y: sloganInView2 ? 0 : 20,
                            }}
                            transition={{ duration: 2 }}
                        >
                            <div className="w-full h-64 sm:h-80 rounded-lg shadow-lg overflow-hidden">
                                <div className="bg-capture-image w-full h-full object-cover object-center"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;
