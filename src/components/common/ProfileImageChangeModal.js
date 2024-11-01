import { useState, useEffect } from "react";
import { getProfileImage, getProfileImageDataByMno, postProfileImage, deleteProfileImageByMno, isExistsProfileImageByMno } from "../../api/profileImageApi";
import defaultImage from "../../asset/icon/cabbi.png";

const ProfileImageChangeModal = ({ mno, isOpen, onClose }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isBasic, setIsBasic] = useState(false);

    const DEFAULT_IMAGE = defaultImage;

    useEffect(() => {
        if (mno && isOpen) {
            setSelectedImage(null);
            setPreview(null);
            const fetchProfileImage = async () => {
                try {
                    const isExistsProfileData = await isExistsProfileImageByMno(mno);
                    if (isExistsProfileData === true) {
                        const data = await getProfileImageDataByMno(mno);
                        if (data.error === "NOT_EXIST_IMAGE") {
                            setProfileImage(DEFAULT_IMAGE);
                            return;
                        }

                        const imageData = await getProfileImage(mno);

                        if (imageData instanceof Blob) {
                            const profileURL = URL.createObjectURL(imageData);
                            setProfileImage(profileURL);
                        } else {
                            throw new Error("Returned data is not a Blob.");
                        }
                    }
                } catch (error) {
                    console.error("Error fetching profile image:", error.message);
                    setProfileImage(DEFAULT_IMAGE);
                }
            };
            fetchProfileImage();
        }
    }, [mno, isOpen, DEFAULT_IMAGE]);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsBasic(false);
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleBasicImage = async () => {
        setIsBasic(true);
        setSelectedImage(DEFAULT_IMAGE);
        setPreview(DEFAULT_IMAGE);
    };

    const handleSave = async () => {
        try {
            if (isBasic) {
                if (mno) await deleteProfileImageByMno(mno);
                setProfileImage(DEFAULT_IMAGE);
            } else {
                await postProfileImage(selectedImage, mno);
            }
            alert("프로필 이미지가 변경되었습니다.");
            onClose();
        } catch (error) {
            console.error("Error updating profile image:", error);
            alert("이미지 업로드에 실패했습니다.");
        }
    };

    const handleCancel = () => {
        if (window.confirm("취소하시겠습니까? 변경 사항이 저장되지 않습니다.")) {
            onClose();
        }
    };

    const handleImageClick = () => {
        // 새 창에서 프로필 이미지를 열기
        const imageUrl = preview || profileImage || DEFAULT_IMAGE;
        window.open(imageUrl, '_blank');
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">프로필 이미지 변경</h2>

                    <div className="flex justify-center mb-6">
                        <img
                            className="w-32 h-32 rounded-full shadow-xl object-cover cursor-pointer transition-transform transform hover:scale-105"
                            src={preview || profileImage || DEFAULT_IMAGE}
                            alt="Profile"
                            onClick={handleImageClick} // 클릭 시 새 창 열기
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    <div className="flex justify-between mb-4">
                        {mno && profileImage && (
                            <button
                                onClick={handleBasicImage}
                                className={`text-blue-500 hover:underline text-sm`}
                            >
                                기본 이미지로 변경
                            </button>
                        )}
                    </div>

                    <div className="flex justify-between gap-2">
                        <button
                            onClick={handleSave}
                            disabled={!selectedImage && !isBasic}
                            className={`flex-1 px-4 py-2 bg-blue-600 text-white rounded-md 
                                ${(!selectedImage && !isBasic) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 transition duration-200"}`}
                        >
                            변경
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProfileImageChangeModal;
