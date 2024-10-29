import React, { useState, useEffect, useCallback } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getProfileImage } from "../../api/profileImageApi";

const MemberInfoSidebar = ({ isOpen, onClose, onLogout }) => {
    const { moveToMyPage } = useCustomMove();
    const { loginState } = useCustomLogin();

    // Move hooks outside of conditional block
    const [profileImage, setProfileImage] = useState(null);

    const loadProfileImage = useCallback(async () => {
        if (!loginState?.mno) return;
        try {
            const imageData = await getProfileImage(loginState?.mno);

            if (imageData instanceof Blob) {
                const profileURL = URL.createObjectURL(imageData);
                console.log(profileURL);
                setProfileImage(profileURL);
            } else {
                throw new Error("Returned data is not a Blob.");
            }
        } catch (error) {
            console.error("Error fetching profile image:", error);
            setProfileImage("https://i.ibb.co/PWd7PTH/Cabbi.jpg");
        }
    }, [loginState]);

    useEffect(() => {
        loadProfileImage();
    }, [loadProfileImage]);

    const handleMyPageClick = () => {
        moveToMyPage(loginState.mno);
        onClose();
    };

    const handleLogoutClick = () => {
        onLogout();
        onClose();
    };

    // Now we can safely return early if `isOpen` is false
    if (!isOpen) return null;

    return (
        <div
            className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"
                } z-50`}
            style={{ width: "250px" }}
        >
            <div className="p-4">
                <img
                    className=" w-24 h-24 rounded-full mx-auto"
                    src={profileImage}
                    alt="Cabbi"
                    border="0"
                />
                <div className="mt-4 flex flex-col space-y-3">
                    <button
                        className="mt-5 w-full rounded-lg text-black hover:bg-gray-100 transition-colors h-10 font-bold"
                        onClick={handleMyPageClick}
                    >
                        마이페이지
                    </button>
                    <button
                        className="w-full rounded-lg text-black hover:bg-gray-100 transition-colors h-10 font-bold"
                        onClick={handleLogoutClick}
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberInfoSidebar;
