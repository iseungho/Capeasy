import React from "react";
import { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const LoginModal = ({ isOpen, onClose }) => {
    const [loginParam, setLoginParam] = useState({ email: '', password: '' });
    const { doLogin, moveToPath } = useCustomLogin();

    const handleChange = (e) => {
        setLoginParam({ ...loginParam, [e.target.name]: e.target.value });
    };

    const handleClickLogin = () => {
        doLogin(loginParam).then(data => {
            if (data.error) {
                alert("이메일과 패스워드를 다시 확인하세요");
            } else {
                alert("로그인 성공");
                moveToPath('/');
                onClose(); // 로그인 성공 후 모달 닫기
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <span className="text-2xl">&times;</span>
                </button>
                <div className="text-4xl font-extrabold text-blue-500 mb-4">
                    Login
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={loginParam.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={loginParam.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleClickLogin}
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;