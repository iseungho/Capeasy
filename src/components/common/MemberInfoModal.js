import React from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";

const MemberInfoModal = ({ isOpen, onClose, profileImage, onLogout, anchorEl }) => {
  const { moveToMyPage } = useCustomMove();
  const { isLogin, loginState } = useCustomLogin();
  if (!isOpen || !isLogin || !anchorEl) return null;

  const handleMyPageClick = () => {
    moveToMyPage();
    onClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  const rect = anchorEl.getBoundingClientRect();
  const modalStyles = {
    position: "fixed",
    top: `${rect.bottom}px`,
    left: `${rect.left - 100}px`,
    transform: "translateY(10px)",
    zIndex: 1000,
  };

  return (
    <div style={modalStyles} className="member-info-modal bg-white shadow-lg rounded-lg p-5 w-72">
      <div className="relative flex items-start space-x-3 space-y-1">
        <div className="bg-profile-image bg-cover w-16 h-16 rounded-full object-cover mb-4 mt-3" />
        <div className="flex-1">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
              ✕
            </button>
          <p className="font-semibold text-gray-900 mt-5 ml-1">{loginState.nickname}</p>
          <p className="text-sm text-gray-500 ml-1">{loginState.email}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col space-y-2 mt-4">
        <button
          className="w-full rounded-lg text-black hover:bg-gray-100 transition-colors h-10"
          onClick={handleMyPageClick}
        >
          프로필
        </button>
        <button
          className="w-full rounded-lg text-black hover:bg-gray-100 transition-colors h-10"
          onClick={handleLogoutClick}
        >
          로그아웃
        </button>
      </div>
    </div>

  );
};

export default MemberInfoModal;
