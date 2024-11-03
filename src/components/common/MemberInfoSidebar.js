import React, { useState, useEffect, useCallback } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { fetchProfileThumbnail } from "../../util/profileImageUtil";
import { useProfileContext } from "../../util/profileContext";

const MemberInfoSidebar = ({ isOpen, onClose, onLogout }) => {
    const { shouldReloadProfile } = useProfileContext();
    const { moveToMyPage } = useCustomMove();
    const { loginState } = useCustomLogin();
    const [profileThumbnailImage, setProfileThumbnailImage] = useState(null);

    const loadProfileImage = useCallback(async () => {
        if (!loginState?.mno) return;
        await fetchProfileThumbnail(loginState?.mno, setProfileThumbnailImage); // 썸네일 이미지 로드
    }, [loginState]);

    useEffect(() => {
        loadProfileImage();
    }, [loadProfileImage, shouldReloadProfile]);

    if (!isOpen) return null;

    const handleMyPageClick = () => {
        moveToMyPage(loginState.mno);
        onClose();
    };

    const handleLogoutClick = () => {
        onLogout();
        onClose();
    };

    //if (!isOpen) return null;

    return (
        <div
            className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-transform transform z-50`}
            style={{ width: "250px" }}
        >
            <div className="p-4">
                <img
                    className=" w-24 h-24 rounded-full mx-auto"
                    src={profileThumbnailImage}
                    alt="profile"
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
