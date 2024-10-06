import React from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";

const MemberInfoSidebar = ({ isOpen, onClose, onLogout }) => {
    const { moveToMyPage } = useCustomMove();
    const { loginState } = useCustomLogin();
    if (!isOpen) return null;

    const handleMyPageClick = () => {
        moveToMyPage(loginState.mno);
        onClose();
    };

    const handleLogoutClick = () => {
        onLogout();
        onClose();
    };

    return (
        <div
            className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-transform transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
            style={{ width: "250px" }} // 사이드바 너비 설정
        >
            <div className="p-4">
                <div className="bg-profile-image bg-cover w-24 h-24 rounded-full mx-auto"/>
                <div className="mt-4 flex flex-col space-y-3">
                    <button
                        className="mt-5 w-full rounded-lg text-black hover:bg-gray-100 transition-colors h-10 font-bold"
                        onClick={handleMyPageClick}
                    >
                        마이페이지
                    </button>
                    <button
                        className="w-full rounded-lg text-black hover:bg-gray-100 transition-colors h-10 font-bold"
                        onClick={handleLogoutClick}
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberInfoSidebar;
