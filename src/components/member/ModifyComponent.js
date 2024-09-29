import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyMember, removeMember } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../common/ResultModal";
import { updateLoginInfo, clearLoginInfo } from "../../slices/loginSlice";

const initState = {
    email: "",
    password: "",
    nickname: ""
}

const ModifyComponent = () => {

    const [member, setMember] = useState(initState)
    const loginInfo = useSelector(state => state.loginSlice)
    const { moveToPath } = useCustomLogin()
    const [result, setResult] = useState()
    const [error, setError] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        setMember({ ...loginInfo, email: loginInfo.email })
    }, [loginInfo])

    const handleChange = (e) => {
        member[e.target.name] = e.target.value
        setMember({ ...member })
    }

    const handleClickModify = async () => {
        try {
            const memberToUpdate = { ...member };
            if (!memberToUpdate.password) {
                delete memberToUpdate.password;
            }
            await modifyMember(memberToUpdate, loginInfo.mno)
            dispatch(updateLoginInfo(memberToUpdate));
            setResult('Modified')
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message)
        }
    }

    const handleClickRemove = async () => {
        const confirmed = window.confirm("정말 회원을 탈퇴하시겠습니까?");
        if (confirmed) {
            try {
                await removeMember(loginInfo.mno);
                dispatch(clearLoginInfo());
                setResult('Removed');
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            }
        }
    }

    const closeModal = () => {
        setResult(null)
        moveToPath("/")
    }

    return (
        <div className="border-2 border-neutral-300 mt-10 m-2 p-4">

            {result ? <ResultModal title={'회원정보'} content={result} callbackFn={closeModal}></ResultModal> : <></>}
            {error ? <div className="text-red-500">{error}</div> : null}

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="p-6 text-right font-bold w-32">Email</div>
                    <input className="p-6 rounded-r border border-solid border-neutral-300 shadow-md flex-grow"
                        name="email" type={'text'} value={member.email} readOnly>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="p-6 text-right font-bold w-32">Password</div>
                    <input className="p-6 rounded-r border border-solid border-neutral-300 shadow-md flex-grow"
                        name="password" type={'password'} value={member.password} onChange={handleChange}>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="p-6 text-right font-bold w-32">Nickname</div>
                    <input className="p-6 rounded-r border border-solid border-neutral-300 shadow-md flex-grow"
                        name="nickname" type={'text'} value={member.nickname} onChange={handleChange}>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-end">
                    <button type="button" onClick={handleClickRemove}
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500">
                        Remove
                    </button>
                    <button type="button" onClick={handleClickModify}
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-neutral-500">
                        Modify
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ModifyComponent;
