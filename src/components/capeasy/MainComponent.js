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

    const { ref: howto1, inView: howtoInView1 } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const { ref: howto2, inView: howtoInView2 } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const { ref: introduce1, inView: introduceInView1 } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const { ref: introduce2, inView: introduceInView2 } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const { ref: introduce3, inView: introduceInView3 } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });


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
                    <h1 className="text-4xl font-bold mb-4 md:text-7xl">언제든, 누구든, 그리고</h1>
                    <p className="text-lg mb-10 md:text-xl">
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

            <div className="w-full h-auto flex items-center">
                <div className="w-full flex items-center">
                    <div className="w-screen">

                        <motion.div
                            ref={howto1}
                            className="w-full h-auto aspect-[3841/3830] bg-howto1-image bg-cover bg-center"
                            initial={{opacity: 0, y: 20}}
                            animate={{
                                opacity: howtoInView1 ? 1 : 0,
                                y: howtoInView1 ? 0 : 20,
                            }}
                            transition={{duration: 1.5}}
                        />

                        <motion.div
                            ref={howto2}
                            className="w-full h-auto aspect-[3841/3145] bg-howto2-image bg-cover bg-center"
                            initial={{opacity: 0, y: 20}}
                            animate={{
                                opacity: howtoInView2 ? 1 : 0,
                                y: howtoInView2 ? 0 : 20,
                            }}
                            transition={{duration: 1.5}}
                        />

                        <motion.div
                            ref={introduce1}
                            className="w-full h-auto aspect-[3841/3588] bg-introduce1-image bg-cover bg-center"
                            initial={{opacity: 0, y: 20}}
                            animate={{
                                opacity: introduceInView1 ? 1 : 0,
                                y: introduceInView1 ? 0 : 20,
                            }}
                            transition={{duration: 1.5}}
                        />

                        <motion.div
                            ref={introduce2}
                            className="w-full h-auto aspect-[3841/2709] bg-introduce2-image bg-cover bg-center"
                            initial={{opacity: 0, y: 20}}
                            animate={{
                                opacity: introduceInView2 ? 1 : 0,
                                y: introduceInView2 ? 0 : 20,
                            }}
                            transition={{duration: 1.5}}
                        />

                        <motion.div
                            ref={introduce3}
                            className="w-full h-auto aspect-[3841/4320] bg-introduce3-image bg-cover bg-center"
                            initial={{opacity: 0, y: 20}}
                            animate={{
                                opacity: introduceInView3 ? 1 : 0,
                                y: introduceInView3 ? 0 : 20,
                            }}
                            transition={{duration: 1.5}}
                        />

                    </div>
                </div>
            </div>

            <section className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Developer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center" onClick={() => {
                        window.open('https://github.com/WellshCorgi', '_blank');
                    }}>
                        <div className="text-4xl mb-4">💸</div>
                        <h3 className="text-2xl font-bold mb-2">강 보 찬</h3>
                        <h4>stitching-service</h4>
                        <p>이미지 초해상화 알고리즘 구현</p>
                        <p>OpenCV 기반 스티칭 알고리즘 구현</p>
                        <p>FastAPI 기반 스티칭 서버 개발</p>
                    </div>
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg text-center"
                        onClick={() => {
                            window.open('https://github.com/juintination', '_blank');
                        }}
                    >
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-2xl font-bold mb-2">권 덕 재</h3>
                        <h4>back-end</h4>
                        <p>ERD 설계 및 데이터베이스 구축</p>
                        <p>Spring Boot 기반 백엔드 API 서버 개발</p>
                        <p>AWS를 통한 서비스 배포 및 CI/CD 구현</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center"  onClick={() => {
                        window.open('https://github.com/iseungho', '_blank');
                    }}
                    >
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-bold mb-2">이 승 호</h3>
                        <h4>front-end</h4>
                        <p>React 기반 웹 애플리케이션 개발</p>
                        <p>Tailwind를 활용한 UI/UX 구현</p>
                        <p>VIEW360을 활용한 VR 뷰어 기능 구현</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center"  onClick={() => {
                        window.open('https://github.com/FIFLove', '_blank');
                    }}
                    >
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-bold mb-2">김 기 현</h3>
                        <h4>front-end</h4>
                        <p>React 기반 웹 애플리케이션 개발</p>
                        <p>Tailwind를 활용한 UI/UX 구현</p>
                        <p>VIEW360을 활용한 VR 뷰어 기능 구현</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainComponent;