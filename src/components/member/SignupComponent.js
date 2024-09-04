import { useState } from "react";
import { signupMember } from "../../api/memberApi";
import ResultModal from "../common/ResultModal";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
    email: "",
    password: "",
    nickname: "",
    role: "USER"
}

const SignupComponent = () => {
    
    const [member, setMember] = useState(initState);
    const [result, setResult] = useState();
    const [error, setError] = useState(null);
    const { moveToPath } = useCustomLogin()

    const handleChange = (e) => {
        member[e.target.name] = e.target.value;
        setMember({ ...member });
    }

    const handleClickSignup = async () => {
        if (!member.email || !member.password || !member.nickname) {
            setError("All fields are required.");
            return;
        }

        try {
            await signupMember(member);
            setResult('Signed up successfully');
            setMember(initState);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                if (error.response.data.error === "EMAIL_ALREADY_EXISTS") {
                    setError("This email is already registered. Please use a different email.");
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
        moveToPath("/")
    }

    return (
        <div className="border-2 border-neutral-300 mt-10 m-2 p-4">
            {result ? <ResultModal title={'회원가입'} content={result} callbackFn={closeModal}></ResultModal> : <></>}
            {error ? <div className="text-red-500">{error}</div> : null}

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="p-6 text-right font-bold w-32">Email</div>
                    <input className="p-6 rounded-r border border-solid border-neutral-300 shadow-md flex-grow"
                        name="email" type={'text'} value={member.email} onChange={handleChange}>
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
                    <button type="button" onClick={handleClickSignup}
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-neutral-500">
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupComponent;
