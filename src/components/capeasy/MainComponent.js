import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import useCustomMove from '../../hooks/useCustomMove';
import pano from '../../asset/backgrounds/pano.mp4';

function MainComponent(props) {
    const { moveToCreate } = useCustomMove();

    const { ref: sloganRef1, inView: sloganInView1 } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: sloganRef2, inView: sloganInView2 } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div>
            <section className="bg-main-background bg-cover text-white min-h-screen flex items-center relative">
                <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0" >
                    <source src={pano} type="video/mp4"/>
                </video>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-7xl font-bold mb-4">언제든, 누구든, 그리고</h1>
                    <p className="text-xl mb-10">어디든. 당신의 추억을 생생하게 기록하세요.</p>
                    <button
                        className="bg-white text-green-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100"
                        onClick={moveToCreate}>
                        Get Started
                    </button>
                </div>
            </section>

            <div className="bg-gray-100 h-[80vh] flex items-center">
                <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
                    {/* 좌측 섹션 */}
                    <div
                        className="md:w-1/2 w-full flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
                        <motion.h1
                            ref={sloganRef1}
                            className="text-4xl font-bold mb-4"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: sloganInView1 ? 1 : 0, y: sloganInView1 ? 0 : 20}}
                            transition={{ duration: 0.8 }}
                        >
                            손쉽게 여행의 추억을 간직하세요
                        </motion.h1>
                        <motion.p
                            ref={sloganRef1}
                            className="text-gray-700 font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: sloganInView1 ? 1 : 0, y: sloganInView1 ? 0 : 20 }}
                            transition={{ duration: 0.8 }}>
                            단 한 번의 촬영으로 여행지에서의 추억을 고스란히 남길 수 있습니다.
                        </motion.p>
                    </div>

                    {/* 우측 섹션 */}
                    <div className="md:w-1/2 w-full">
                        <motion.div
                            ref={sloganRef1}
                            className="bg-main-slogan-1 w-full h-96 rounded-lg shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: sloganInView1 ? 1 : 0, y: sloganInView1 ? 0 : 20 }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 h-[80vh] flex items-center">
                <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
                    {/* 좌측 섹션 */}
                    <div className="md:w-1/2 w-full">
                        <motion.div
                            ref={sloganRef2}
                            className="bg-main-slogan-1 w-full h-96 rounded-lg shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: sloganInView2 ? 1 : 0, y: sloganInView2 ? 0 : 20 }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>

                    {/* 우측 섹션 */}
                    <div className="md:w-1/2 w-full flex flex-col items-center md:items-end text-center md:text-right mb-8 md:mb-0">
                        <motion.h1
                            ref={sloganRef2}
                            className="text-4xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: sloganInView2 ? 1 : 0, y: sloganInView2 ? 0 : 20 }}
                            transition={{ duration: 0.8 }}
                        >
                            개선된 이미지로 추억을 보다 선명하게
                        </motion.h1>

                        <motion.p
                            ref={sloganRef2}
                            className="text-gray-700 font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: sloganInView2 ? 1 : 0, y: sloganInView2 ? 0 : 20 }}
                            transition={{ duration: 0.8 }}>
                            CapEasy만의 화질개선 기능으로 보다 더 아름다운 그 시절의 장면을 재현해 드립니다.
                        </motion.p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">우리는 모두 친구 종합 선물 세트</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-4xl mb-4">💸</div>
                        <h3 className="text-2xl font-bold mb-2">Feature 1</h3>
                        <p>Detail about feature 1 goes here. It's really amazing!</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-2xl font-bold mb-2">Feature 2</h3>
                        <p>Detail about feature 2 goes here. It's really amazing!</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-bold mb-2">Feature 3</h3>
                        <p>Detail about feature 3 goes here. It's really amazing!</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-bold mb-2">Feature 3</h3>
                        <p>Detail about feature 3 goes here. It's really amazing!</p>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2024 종합 선물 세트. All rights reserved.</p>
                    <div className="space-x-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MainComponent;
