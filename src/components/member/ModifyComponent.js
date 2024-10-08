import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyMember, removeMember } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { updateLoginInfo, clearLoginInfo } from "../../slices/loginSlice";

const initState = {
    email: "",
    newPassword: "",
    confirmPassword: "",
    nickname: ""
}

const ModifyComponent = () => {
    const [member, setMember] = useState(initState);
    const loginInfo = useSelector(state => state.loginSlice);
    const { moveToPath } = useCustomLogin();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setMember({ ...loginInfo, email: loginInfo.email });
    }, [loginInfo]);

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    }

    const handleClickModify = async () => {
        // 비밀번호 확인
        if (member.newPassword !== member.confirmPassword) {
            setError("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const memberToUpdate = { ...member };

            if (!member.newPassword) {
                delete memberToUpdate.newPassword;
            } else {
                memberToUpdate.password = member.newPassword;
            }

            delete memberToUpdate.currentPassword;
            delete memberToUpdate.confirmPassword;
            delete memberToUpdate.newPassword;

            await modifyMember(memberToUpdate, loginInfo.mno);
            dispatch(updateLoginInfo(memberToUpdate));
            alert('회원 정보가 수정되었습니다.');
            moveToPath("/");
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    }

    const handleClickRemove = async () => {
        const confirmed = window.confirm("정말 회원을 탈퇴하시겠습니까?");
        if (confirmed) {
            try {
                await removeMember(loginInfo.mno);
                dispatch(clearLoginInfo());
                alert('회원 탈퇴가 완료되었습니다.');
                moveToPath("/");
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            }
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-12 sm:w-full md:w-2/3 lg:w-2/5 ">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">회원정보 수정</h1>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">이메일</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 focus:outline-none"
                    name="email" type="text" value={member.email} readOnly />
            </div>

            {/* 새 비밀번호 입력 */}
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">새 비밀번호</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    name="newPassword" type="password" value={member.newPassword} onChange={handleChange}
                    placeholder="새 비밀번호를 입력하세요" />
            </div>

            {/* 새 비밀번호 확인 입력 */}
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    name="confirmPassword" type="password" value={member.confirmPassword} onChange={handleChange}
                    placeholder="새 비밀번호를 다시 입력하세요" />
            </div>

            {/* 닉네임 수정 */}
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">닉네임</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    name="nickname" type="text" value={member.nickname} onChange={handleChange}
                    placeholder="닉네임을 입력하세요" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-6">
                <button
                    type="button" onClick={handleClickRemove}
                    className="flex-1 py-3 m-2 rounded-lg bg-red-500 text-white text-xl font-semibold hover:bg-red-600 transition-colors duration-300">
                    탈퇴
                </button>
                <button
                    type="button" onClick={handleClickModify}
                    className="flex-1 py-3 m-2 rounded-lg bg-gray-500 text-white text-xl font-semibold hover:bg-gray-600 transition-colors duration-300">
                    수정
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;