import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkPassword } from "../../api/memberApi";
import { updateLoginInfo } from "../../slices/loginSlice";
import ModifyPage from "../../pages/member/ModifyPage";
import ResultModal from "../common/ResultModal";

const initState = {
    mno: 0,
    password: ''
}

const CheckPasswordComponent = () => {

    const [member, setMember] = useState(initState)
    const loginInfo = useSelector(state => state.loginSlice)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const { password, ...rest } = loginInfo;
        setMember({ ...rest, mno: loginInfo.mno })
    }, [loginInfo])

    const handleChange = (e) => {
        member[e.target.name] = e.target.value
        setMember({ ...member })
    }

    const handleClickCheckPassword = async () => {
        try {
            const result = await checkPassword(member);
            if (result) {
                dispatch(updateLoginInfo({ ...loginInfo, password: member.password }));
                setResult('Redirecting to modify page...');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                if (error.response.data.error === "INVALID_PASSWORD") {
                    setError("The password you entered is incorrect. Please try again.");
                } else {
                    setError(error.response.data.error);
                }
            } else {
                setError(error.message);
            }
        }
    }

    const closeModal = () => {
        setResult(null);
        setIsAuthenticated(true);
    }

    if (isAuthenticated) {
        return <ModifyPage />;
    }

    return (
        <div className="border-2 border-neutral-300 mt-10 m-2 p-4">

            {result ? <ResultModal title={'Password Check'} content={result} callbackFn={closeModal}></ResultModal> : null}
            {error ? <div className="text-red-500">{error}</div> : null}

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="p-6 text-right font-bold w-32">Password</div>
                    <input className="p-6 rounded-r border border-solid border-neutral-300 shadow-md flex-grow"
                        name="password" type={'password'} value={member.password} onChange={handleChange}>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-end">
                    <button type="button" onClick={handleClickCheckPassword}
                        className="rounded p-4 w-36 bg-neutral-500 text-xl text-white">
                        Check
                    </button>
                </div>
            </div>

        </div>
    );
}

export default CheckPasswordComponent;
