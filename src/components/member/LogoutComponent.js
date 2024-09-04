import React from 'react';
import useCustomLogin from "../../hooks/useCustomLogin";

const LogoutComponent = () => {

    const { doLogout, moveToPath } = useCustomLogin()

    const handleClickLogout = () => {
        doLogout()
        alert("로그아웃되었습니다.")
        moveToPath("/")
    }

    return (
        <div className="border-2 border-red-200 mt-10 m-2 p-4">

            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-red-500">
                    Logout Component
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <button className="rounded p-4 w-36 bg-red-500 text-xl text-white" onClick={handleClickLogout}>
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LogoutComponent;
