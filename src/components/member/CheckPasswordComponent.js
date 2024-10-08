import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkPassword } from "../../api/memberApi";
import { updateLoginInfo } from "../../slices/loginSlice";
import ModifyPage from "../../pages/member/ModifyPage";

const initState = {
    mno: 0,
    password: ''
}

const CheckPasswordComponent = () => {
    const [member, setMember] = useState(initState);
    const loginInfo = useSelector(state => state.loginSlice);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const { password, ...rest } = loginInfo;
        setMember({ ...rest, mno: loginInfo.mno });
    }, [loginInfo]);

    const handleChange = (e) => {
        member[e.target.name] = e.target.value;
        setMember({ ...member });
    }

    const handleClickCheckPassword = async () => {
        try {
            const result = await checkPassword(member);
            if (result) {
                dispatch(updateLoginInfo({ ...loginInfo, password: member.password }));
                alert("비밀번호 확인이 완료되었습니다.");
                setIsAuthenticated(true);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                if (error.response.data.error === "INVALID_PASSWORD") {
                    setError("입력한 비밀번호가 잘못되었습니다. 다시 시도하십시오.");
                } else {
                    setError(error.response.data.error);
                }
            } else {
                setError(error.message);
            }
        }
    }

    // 엔터키 눌렀을 때 비밀번호 확인
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClickCheckPassword();
        }
    }

    if (isAuthenticated) {
        return <ModifyPage />;
    }

    return (
        <div className="max-w-lg mx-auto p-6 sm:w-full md:w-2/3 lg:w-2/5">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">회원정보 수정</h1>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">비밀번호 확인</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    name="password" type="password" value={member.password} onChange={handleChange}
                    onKeyDown={handleKeyDown}  // 엔터키 입력 처리
                    placeholder="비밀번호를 입력하세요" />
            </div>

            <div className="text-center">
                <button
                    type="button" onClick={handleClickCheckPassword}
                    className="w-full py-3 rounded-lg bg-gray-500 text-white text-xl font-semibold hover:bg-gray-600 transition-colors duration-300">
                    확인
                </button>
            </div>
        </div>
    );
}

export default CheckPasswordComponent;