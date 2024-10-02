import React from "react";
import useCustomMove from "../../hooks/useCustomMove";

const MemberInfoModal = ({ isOpen, onClose, profileImage, onLogout, position }) => {
  const { moveToMyPage } = useCustomMove();
  if (!isOpen) return null;

  const handleMyPageClick = () => {
    moveToMyPage();
    onClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg z-50 member-info-modal"
      style={{ top: `${position.top}px`, left: `${position.left}px`, width: "200px" }}
    >
      <div className="p-4 flex flex-col items-center">
        <div
          className="bg-profile-image bg-cover w-32 h-32 rounded-full mb-3 object-cover"
        />
        <div className="mt-4 flex flex-col space-y-3 w-full">
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
          <button
            className="bg-gray-300 text-black w-full py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberInfoModal;
