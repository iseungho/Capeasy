import React from "react";
import { useNavigate } from "react-router-dom";

const MemberInfoModal = ({ isOpen, onClose, profileImage, onLogout }) => {
  const navigate = useNavigate();

  if (!isOpen) return null; 

  const handleMyPageClick = () => {
    navigate("/member/my");
    onClose(); 
  };

  const handleLogoutClick = () => {
    onLogout(); 
    onClose(); 
  };

  return (
    <div className="absolute top-16 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
      <div className="p-4 flex flex-col items-center">
        <img
          src={profileImage || 'https://via.placeholder.com/150'}
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
