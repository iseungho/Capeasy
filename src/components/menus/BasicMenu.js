import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal";
import MemberInfoSidebar from "../common/MemberInfoSidebar";
import useCustomMove from "../../hooks/useCustomMove";

const BasicMenu = ({ children }) => {
  const loginState = useSelector((state) => state.loginSlice);
  const { doLogout, moveToPath } = useCustomLogin();
  const { moveToMain, moveToBoardList } = useCustomMove();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴 상태 관리

  const handleLogout = useCallback(() => {
    doLogout();
    alert("정상적으로 로그아웃되었습니다!");
    moveToPath("/");
  }, [doLogout, moveToPath]);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
        <nav id="navbar" className="fixed w-full top-0 left-0 z-50 bg-white shadow">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div
                  className="bg-logo-image bg-cover w-48 h-16 font-bold text-blue-500 cursor-pointer"
                  onClick={moveToMain}
              ></div>
              <button className="text-gray-500 font-semibold text-xl hidden md:block" onClick={moveToBoardList}>
                Community
              </button>
            </div>

            {/* 모바일 메뉴 토글 */}
            <button
                className="md:hidden text-gray-500 focus:outline-none"
                onClick={toggleMenu}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>

            <nav className="space-x-4 flex items-center">
              {!loginState.email ? (
                  <>
                    <button
                        className="bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg"
                        onClick={openLoginModal}
                    >
                      Login
                    </button>
                  </>
              ) : (
                  <>
                    <button
                        className="bg-profile-image bg-cover w-14 h-14 rounded-full cursor-pointer profile-button"
                        onClick={toggleSidebar}
                    />
                  </>
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
      </div>
  );
};

export default BasicMenu;
