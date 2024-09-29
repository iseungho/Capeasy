import React from "react";
import { useNavigate } from "react-router-dom";

const MemberInfoModal = ({ isOpen, onClose, profileImage, onLogout }) => {
  const navigate = useNavigate();

  if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  const handleMyPageClick = () => {
    navigate("/member/my"); // 마이페이지로 이동
    onClose(); // 모달 닫기
  };

  const handleLogoutClick = () => {
    onLogout(); // 로그아웃 기능 호출
    onClose(); // 모달 닫기
  };

  return (
    <div className="absolute top-16 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
      <div className="p-4 flex flex-col items-center">
        {/* 프로필 이미지 표시 */}
        <img
          src={profileImage || '/default-profile.png'}
          alt="Profile"
          className="w-16 h-16 rounded-full mb-2"
        />
        <div className="flex flex-col space-y-2 w-full">
          <button
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleMyPageClick}
          >
            마이페이지
          </button>
          <button
            className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition"
            onClick={handleLogoutClick}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberInfoModal;
