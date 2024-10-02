import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal";
import MemberInfoModal from "../common/MemberInfoModal";
import useCustomMove from "../../hooks/useCustomMove";

const BasicMenu = ({ children }) => {
    const loginState = useSelector(state => state.loginSlice);
    const { doLogout, moveToPath } = useCustomLogin();
    const { moveToMain, moveToBoardList } = useCustomMove();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isMemberInfoOpen, setIsMemberInfoOpen] = useState(false);

    const handleLogout = useCallback(() => {
        doLogout();
        alert("정상적으로 로그아웃되었습니다!");
        moveToPath("/");
    }, [doLogout, moveToPath]);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openMemberInfo = () => setIsMemberInfoOpen(true);
    const closeMemberInfo = () => setIsMemberInfoOpen(false);

    return (
        <div>
            <nav id="navbar" className="fixed w-full top-0 left-0 z-50 bg-white shadow">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div
                            className="bg-logo-image bg-cover w-48 h-16 font-bold text-blue-500"
                            onClick={moveToMain}
                        ></div>
                        <button
                            className="text-gray-400 font-black text-lg"
                            onClick={moveToBoardList}
                        >
                            Community
                        </button>
                    </div>
    
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
                                <img
                                    src={loginState.profileImage || 'https://via.placeholder.com/150'}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full cursor-pointer"
                                    onClick={openMemberInfo}
                                />
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
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        </div>
    );
    
};

export default BasicMenu;