import React, {useCallback} from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import useCustomMove from "../../hooks/useCustomMove";
import LoginModal from "../member/LoginModal";

function MainComponent(props) {
    const { moveToCreate } = useCustomMove();
    const loginState = useSelector(state => state.loginSlice);

    const [isModalOpen, setIsModalOpen] = React.useState(false); // 모달 상태 추가

    const handleGetStarted = useCallback(() => {
        if (loginState.email) {
            moveToCreate();
        } else {
            setIsModalOpen(true); // 로그인 모달 열기
        }
    }, [loginState.email, moveToCreate]);

    const { ref: sloganRef1, inView: sloganInView1 } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: sloganRef2, inView: sloganInView2 } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    // 스크롤 시 버튼을 보이게 하는 로직


    return (
        <div>
            <section className="text-white min-h-screen flex items-center relative overflow-hidden">
                {/* YouTube 비디오 배경 */}
                <div className="absolute inset-0 z-0">
                    <iframe
                        src="https://www.youtube.com/embed/i_6QY64wefM?autoplay=1&mute=1&loop=1&playlist=i_6QY64wefM&controls=0&modestbranding=0&showinfo=0&rel=0&vq=hd1080"
                        title="pano demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        className="absolute mt-1 top-0 left-0 w-full h-full object-cover pointer-events-none"
                        style={{
                            height: '60vw', // 16:9 비율을 위한 설정
                            minHeight: '100vh',
                            minWidth: '174vh', // 16:9 비율을 위한 설정
                        }}
                    ></iframe>
                </div>


                <div className="container mx-auto px-6 text-center relative z-20">
                    <h1 className="text-7xl font-bold mb-4">언제든, 누구든, 그리고</h1>
                    <p className="text-xl mb-10">
                        어디든. 당신의 추억을 생생하게 기록하세요.
                    </p>
                    <button
                        className="bg-white text-green-500 px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-gray-200 shadow-lg"
                        onClick={handleGetStarted}
                    >
                        Get Started
                    </button>
                </div>
            </section>
            {/* 로그인 모달 추가 */}
            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="bg-gray-100 h-[80vh] flex items-center">
                <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
                    {/* 좌측 섹션 */}
                    <div
                        className="md:w-1/2 w-full flex flex-col items-center md:items-start text-center md:text-center mb-8 md:mb-0">
                        <motion.h1
                            ref={sloganRef1}
                            className="text-4xl font-bold mb-4 md:ml-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            손쉽게 여행의 추억을 간직하세요
                        </motion.h1>
                        <motion.p
                            ref={sloganRef1}
                            className="text-gray-700 font-bold mb-4 md:ml-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            단 한 번의 촬영으로 여행지에서의 추억을 고스란히 남길 수 있습니다.
                        </motion.p>
                    </div>

                    {/* 우측 섹션 */}
                    <div className="md:w-1/2 w-full">
                        <motion.div
                            ref={sloganRef1}
                            className="bg-main-slogan-1 w-full h-96 rounded-lg shadow bg-cover"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView1 ? 1 : 0,
                                y: sloganInView1 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 h-[80vh] flex items-center">
                <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center ">
                    {/* 좌측 섹션 */}
                    <div className="md:w-1/2 w-full">
                        <motion.div
                            ref={sloganRef2}
                            className="bg-main-slogan-2 w-full h-96 rounded-lg shadow bg-cover"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView2 ? 1 : 0,
                                y: sloganInView2 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>

                    {/* 우측 섹션 */}
                    <div className="md:w-1/2 w-full flex flex-col items-center md:items-center text-center md:text-right mb-8 md:mb-0">
                        <motion.h1
                            ref={sloganRef2}
                            className="text-4xl font-bold m-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView2 ? 1 : 0,
                                y: sloganInView2 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            개선된 이미지로 추억을 보다 선명하게
                        </motion.h1>

                        <motion.p
                            ref={sloganRef2}
                            className="text-gray-700 font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sloganInView2 ? 1 : 0,
                                y: sloganInView2 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            CapEasy만의 화질개선 기능으로 보다 더 아름다운 그 시절의 장면을
                            재현해 드립니다.
                        </motion.p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                    우리는 모두 친구 종합 선물 세트
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" onClick={() => {
                    window.open('https://github.com/WellshCorgi', '_blank');
                }}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-4xl mb-4">💸</div>
                        <h3 className="text-2xl font-bold mb-2">강 보 찬</h3>
                        <h4>Back-end</h4>
                        <p>SRCNN 필터를 사용한 화질 개선</p>
                        <p>Open-CV를 활용한 이미지 스티칭 구현</p>
                        <p>스티칭을 위한 Flask Rest API 구축</p>
                    </div>
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg text-center"
                        onClick={() => {
                            window.open('https://github.com/juintination', '_blank');
                        }}
                    >
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-2xl font-bold mb-2">권 덕 재</h3>
                        <h4>Back-end</h4>
                        <p>Spring 서버 구축</p>
                        <p>비디오 및 이미지 DB 관리</p>
                        <p>스티칭을 위한 Flask Rest API 구축</p>
                        <p>AWS를 활용한 배포 및 CI/CD</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center"  onClick={() => {
                        window.open('https://github.com/iseungho', '_blank');
                    }}
                    >
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-bold mb-2">이 승 호</h3>
                        <h4>Front-end</h4>
                        <p>React 반응형 웹 제작</p>
                        <p>Tailwind를 이용한 UI/UX</p>
                        <p>VIEW360을 사용한 VR 뷰어</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center"  onClick={() => {
                        window.open('https://github.com/FIFLove', '_blank');
                    }}
                    >
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-bold mb-2">김 기 현</h3>
                        <h4>Front-end</h4>
                        <p>React 반응형 웹 제작</p>
                        <p>Tailwind를 이용한 UI/UX</p>
                        <p>VIEW360을 사용한 VR 뷰어</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainComponent;