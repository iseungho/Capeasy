import React, { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const LoginModal = ({ isOpen, onClose }) => {
    const [loginParam, setLoginParam] = useState({ email: '', password: '', keepLoggedIn: false });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { doLogin, moveToPath } = useCustomLogin();

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginParam(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // 입력값 변화 시 에러 초기화
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!emailRegEx.test(loginParam.email)) {
            newErrors.email = '유효한 이메일 주소를 입력하세요.';
            isValid = false;
        }

        if (!passwordRegEx.test(loginParam.password)) {
            newErrors.password = '비밀번호가 유효하지 않습니다.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleClickLogin = () => {
        if (!validate()) {
            return; // 유효성 검사 실패 시 로그인 진행 중단
        }

        doLogin(loginParam).then(data => {
            if (data.error) {
                setErrors({
                    email: '',
                    password: '이메일 또는 비밀번호가 유효하지 않습니다.'
                });
            } else {
                alert("다시 오셨군요! 환영합니다.");
                moveToPath('/');
                onClose(); // 로그인 성공 후 모달 닫기
            }
        }); 
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClickLogin();
        }
    };

    const confirmClose = () => {
        if (window.confirm("진행상황이 저장되지 않습니다. 정말로 닫으시겠습니까?")) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
            onClick={confirmClose} // 모달 외부 클릭 시 확인창 띄우기
        >
            <div
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 막기
            >
                {/* 오른쪽 상단 닫기 버튼 */}
                <button className="absolute top-4 right-4" onClick={confirmClose}>
                    <span className="text-3xl font-bold text-gray-400 hover:text-gray-600">&times;</span>
                </button>

                {/* 로그인 모달 타이틀 */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-black">로그인</h2>
                </div>

                {/* 이메일 입력 */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={loginParam.email}
                        placeholder={"이메일을 입력하세요."}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress} // Enter 키 입력 감지
                        className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* 패스워드 입력 */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder={"비밀번호를 입력하세요."}
                        value={loginParam.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress} // Enter 키 입력 감지
                        className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* 로그인 유지하기 체크박스 */}
                <div className="mb-4 flex items-center">
                    <input
                        id="keepLoggedIn"
                        name="keepLoggedIn"
                        type="checkbox"
                        checked={loginParam.keepLoggedIn}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="keepLoggedIn" className="text-sm">
                        로그인 유지하기
                    </label>
                </div>

                {/* 로그인 버튼 */}
                <div className="mb-6">
                    <button
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                        onClick={handleClickLogin}
                    >
                        로그인
                    </button>
                </div>

                {/* 또는 다른 계정으로 로그인 */}
                <div className="text-center text-gray-400 mb-5">또는</div>

                {/* 소셜 로그인 버튼들 */}
                <div className="space-y-3">
                    <button
                        className="w-full flex items-center justify-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                    >
                        Continue with Naver
                    </button>

                    <button
                        className="w-full flex items-center justify-center bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition"
                    >
                        Continue with Kakao
                    </button>
                </div>

                {/* 회원가입 링크 */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        아직 계정이 없으신가요?{' '}
                        <a
                            href="/member/signup"
                            className="text-blue-500 hover:underline"
                        >
                            회원가입
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;