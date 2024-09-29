import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal"; // LoginModal 추가
import MemberInfoModal from "../member/MemberInfoModal"; // MemberInfoModal 추가
import useCustomMove from "../../hooks/useCustomMove";

const BasicMenu = ({ children }) => {
  const loginState = useSelector(state => state.loginSlice);
  const { doLogout, moveToPath } = useCustomLogin();
  const { moveToMain, moveToBoardList } = useCustomMove();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 상태
  const [isMemberInfoOpen, setIsMemberInfoOpen] = useState(false); // 프로필 모달 상태

  const handleLogout = useCallback(() => {
    doLogout();
    alert("정상적으로 로그아웃되었습니다!");
    moveToPath("/"); // 홈으로 리다이렉션
  }, [doLogout, moveToPath]);

  const openLoginModal = () => setIsLoginModalOpen(true); // 로그인 모달 열기
  const closeLoginModal = () => setIsLoginModalOpen(false); // 로그인 모달 닫기

  const openMemberInfo = () => setIsMemberInfoOpen(true); // 프로필 모달 열기
  const closeMemberInfo = () => setIsMemberInfoOpen(false); // 프로필 모달 닫기

  return (
    <div className="relative">
      <nav id="navbar" className="fixed w-full top-0 left-0 z-50 bg-white shadow">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <nav className="space-x-1 flex items-center">
            <button
              className="bg-logo-image bg-cover w-48 h-16 font-bold text-blue-500"
              onClick={moveToMain}
            ></button>
            {/* 커뮤니티 버튼 */}
            <button
              className="ml-4 text-gray-700 hover:text-gray-900 text-lg font-semibold"
              onClick={moveToBoardList}
            >
              커뮤니티
            </button>
          </nav>
          <nav className="space-x-4 flex items-center relative">
            {!loginState.email ? (
              <>
                {/* 로그인 링크 (초록색 텍스트) */}
                <span
                  className="text-green-500 cursor-pointer hover:underline"
                  onClick={openLoginModal}
                >
                  Login
                </span>
                <Link
                  to={'/member/signup'}
                  className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <>
                {/* 로그인 상태에서 프로필 이미지 */}
                <img
                  src={loginState.profileImage || '/default-profile.png'}
                  alt="Profile"
                  className="w-12 h-12 rounded-full cursor-pointer"
                  onClick={openMemberInfo}
                />
                {/* 프로필 이미지 클릭 시 MemberInfoModal 열림 */}
                <MemberInfoModal
                  isOpen={isMemberInfoOpen}
                  onClose={closeMemberInfo}
                  profileImage={loginState.profileImage}
                  onLogout={handleLogout}
                />
              </>
            )}
          </nav>
        </div>
      </nav>
      {children}

      {/* LoginModal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default BasicMenu;
