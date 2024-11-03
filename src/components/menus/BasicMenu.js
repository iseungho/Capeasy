import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal";
import MemberInfoSidebar from "../common/MemberInfoSidebar";
import useCustomMove from "../../hooks/useCustomMove";
import { useAutoLogout } from "../../hooks/useAutoLogout";
import { fetchProfileThumbnail } from "../../util/profileImageUtil";
import { useProfileContext } from "../../util/profileContext";

const BasicMenu = ({ children }) => {
  const { shouldReloadProfile } = useProfileContext();
  useAutoLogout(); // 자동 로그아웃 활성화

  const loginState = useSelector((state) => state.loginSlice);
  const { doLogout, moveToPath } = useCustomLogin();
  const { moveToMain, moveToAbout, moveToBoardList } = useCustomMove();

  const [profileThumbnailImage, setProfileThumbnailImage] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴 상태 관리
  const [showScrollButton, setShowScrollButton] = useState(false); // 스크롤 버튼 상태 추가

  const handleLogout = useCallback(() => {
    doLogout();
    alert("정상적으로 로그아웃되었습니다!");
    moveToPath("/");
  }, [doLogout, moveToPath]);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const loadProfileImage = useCallback(async () => {
    if (!loginState?.mno) return;
    await fetchProfileThumbnail(loginState?.mno, setProfileThumbnailImage); // 썸네일 이미지 로드
  }, [loginState]);

  useEffect(() => {
    loadProfileImage();
  }, [loadProfileImage, shouldReloadProfile]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar") && !event.target.closest(".profile-button")) {
        setIsSidebarOpen(true);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
      <div>
        <nav id="navbar" className="fixed w-full top-0 left-0 z-30 bg-white shadow">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div
                  className="bg-logo-image bg-cover w-36 h-12 md:w-48 md:h-16 font-bold text-blue-500 cursor-pointer"
                  onClick={moveToMain}
              ></div>
              <button className="text-gray-500 font-semibold text-xl hidden md:block" onClick={moveToBoardList}>
                Community
              </button>
              <button className="text-gray-500 font-semibold text-xl hidden md:block" onClick={moveToAbout}>
                About
              </button>
            </div>

            {/* 모바일 메뉴 토글 */}
            <button
                className="md:hidden text-gray-500 focus:outline-none"
                onClick={toggleMenu}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <nav className="space-x-4 flex items-center">
              {!loginState.email ? (
                  <button
                      className="bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg"
                      onClick={openLoginModal}
                  >
                    Login
                  </button>
              ) : (
                  <button onClick={toggleSidebar}>
                    <img
                        className="bg-cover w-14 h-14 rounded-full cursor-pointer profile-button"
                        src={profileThumbnailImage} // 썸네일 이미지 우선 사용
                        alt="Profile"
                        border="0"
                    />
                  </button>
              )}
            </nav>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
              <div className="md:hidden">
                <div className="bg-white shadow-lg rounded-lg py-2 space-y-2">
                  <button
                      className="block w-full text-left text-gray-700 px-4 py-2 hover:bg-gray-200"
                      onClick={moveToBoardList}
                  >
                    Community
                  </button>
                  <button
                      className="block w-full text-left text-gray-700 px-4 py-2 hover:bg-gray-200"
                      onClick={moveToAbout}
                  >
                    About
                  </button>
                </div>
              </div>
          )}
        </nav>
        {children}
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

        {/* 회색 배경과 사이드바 */}
        {isSidebarOpen && (
            <>
              <div
                  className="fixed inset-0 bg-gray-600 opacity-50 z-40"
                  onClick={() => setIsSidebarOpen(false)} // 클릭하면 사이드바 닫기
              ></div>
              <MemberInfoSidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  onLogout={handleLogout}
              />
            </>
        )}
        {showScrollButton && (
            <div className="fixed bottom-5 right-5 flex items-center space-x-2 z-30">
              {/* Contact Us 버튼 */}
              <button
                  onClick={() => window.location.href = 'mailto:ghehf51@naver.com'}
                  className="bg-green-400 text-white px-3 py-3 md:text-xl md:px-6 md:py-3 rounded-full text-sm font-semibold hover:bg-green-500 shadow-lg transition-transform transform hover:scale-105"
              >
                Contact Us
              </button>

              {/* 맨 위로 스크롤 버튼 */}
              <button
                  onClick={scrollToTop}
                  className="bg-green-400 text-white px-3 py-3 md:px-4 md:py-4 rounded-full hover:bg-green-500 transition-transform transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 8l-6 6 1.5 1.5L12 11l4.5 4.5L18 14z" />
                </svg>
              </button>
            </div>
        )}
      </div>
  );
};

export default BasicMenu;
