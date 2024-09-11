import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import useCustomMove from "../../hooks/useCustomMove";
import pano from "../../asset/backgrounds/pano.mp4";

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
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={pano} type="video/mp4" />
        </video>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-7xl font-bold mb-4">언제든, 누구든, 그리고</h1>
          <p className="text-xl mb-10">
            어디든. 당신의 추억을 생생하게 기록하세요.
          </p>
          <button
            className="bg-white text-green-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200"
            onClick={moveToCreate}
          >
            Get Started
          </button>
        </div>
      </section>

      <div className="bg-gray-100 h-[80vh] flex items-center">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
          {/* 좌측 섹션 */}
          <div className="md:w-1/2 w-full flex flex-col items-center md:items-start text-center md:text-center mb-8 md:mb-0">
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
              className="text-4xl font-bold mb-4"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-2xl font-bold mb-2">강 보 찬</h3>
            <h4>Back-end</h4>
            <p>SRCNN 필터를 사용한 화질 개선</p>
            <p>Open-CV를 활용한 이미지 스티칭 구현</p>
            <p>스티칭을 위한 Flask Rest API 구축</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-2">권 덕 재</h3>
            <h4>Back-end</h4>
            <p>Spring 서버 구축</p>
            <p>비디오 및 이미지 DB 관리</p>
            <p>스티칭을 위한 Flask Rest API 구축</p>
            <p>AWS를 활용한 배포 및 CI/CD</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-2">이 승 호</h3>
            <h4>Front-end</h4>
            <p>React 반응형 웹 제작</p>
            <p>Tailwind를 이용한 UI/UX</p>
            <p>VIEW360을 사용한 VR 뷰어</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-2">김 기 현</h3>
            <h4>Front-end</h4>
            <p>React 반응형 웹 제작</p>
            <p>Tailwind를 이용한 UI/UX</p>
            <p>VIEW360을 사용한 VR 뷰어</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg">&copy; 2024 CapEasy. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
            <a
                href="/service"
                className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>
            <a
                href="mailto:ghehf51@naver.com"
                className="text-gray-400 hover:text-white transition duration-300"
            >
              Contact Us
            </a>
            <a
                href="https://github.com/iseungho/Capeasy"
                target="_blank" // 새 창에서 열리도록 설정
                rel="noopener noreferrer" // 보안 이슈 방지
                className="text-gray-400 hover:text-white transition duration-300"
            >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                  d="M12 2.04c-5.48 0-9.96 4.48-9.96 9.96 0 4.38 2.86 8.09 6.84 9.38.5.1.66-.22.66-.48v-1.68c-2.78.6-3.36-1.34-3.36-1.34-.44-1.12-1.08-1.42-1.08-1.42-.88-.6.06-.6.06-.6 1 .08 1.5 1 1.5 1 .9 1.52 2.28 1.08 2.84.82.1-.66.34-1.08.62-1.34-2.22-.26-4.56-1.12-4.56-5 0-1.1.38-2 .98-2.7-.1-.26-.44-1.32.08-2.76 0 0 .84-.28 2.76 1.06a9.57 9.57 0 012.52-.34c.86 0 1.74.12 2.52.34 1.92-1.34 2.76-1.06 2.76-1.06.52 1.44.18 2.5.08 2.76.62.7.98 1.6.98 2.7 0 3.88-2.34 4.74-4.56 5 .36.3.68.92.68 1.88v2.82c0 .26.16.58.68.48a10.01 10.01 0 006.84-9.38c0-5.48-4.48-9.96-9.96-9.96z"/>
            </svg>
          </a>
        </div>
    </div>
</footer>
</div>
)
  ;
}

export default MainComponent;
