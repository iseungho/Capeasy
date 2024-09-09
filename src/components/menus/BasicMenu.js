import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal"; // LoginModal 추가

const BasicMenu = ({ children }) => {
    const navigate = useNavigate();
    const loginState = useSelector(state => state.loginSlice);
    const { doLogout, moveToPath } = useCustomLogin();

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

    const handleClickLogo = useCallback(() => {
        navigate({ pathname: `/` });
    }, [navigate]);

    const handleLogout = useCallback(() => {
        doLogout();
        alert("정상적으로 로그아웃되었습니다!");
        moveToPath("/"); // 홈으로 리다이렉션
    }, [doLogout, moveToPath]);

    const openModal = () => setIsModalOpen(true); // 모달 열기 함수
    const closeModal = () => setIsModalOpen(false); // 모달 닫기 함수

    return (
        <div>
            <nav id="navbar" className="fixed w-full top-0 left-0 z-50 bg-white shadow">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <nav className="space-x-1">
                        <button
                            className="bg-logo-image bg-cover w-48 h-16 font-bold text-blue-500"
                            onClick={handleClickLogo}
                        ></button>
                    </nav>
                    <nav className="space-x-4 flex items-center">
                        {!loginState.email ? (
                            <>
                                <Link to={'/member/signup'} className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg">
                                    SignUp
                                </Link>
                                <button
                                    className="bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg"
                                    onClick={openModal} // Login 버튼 클릭 시 모달 열기
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={'/member/modify'} className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg">
                                    Modify
                                </Link>
                                <button
                                    className="bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            </nav>
            {children}

            {/* LoginModal 추가 */}
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default BasicMenu;