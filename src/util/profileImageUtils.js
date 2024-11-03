import { getProfileImage, getProfileImageDataByMno, isExistsProfileImageByMno, viewThumbnailGetByMno } from "../api/profileImageApi";
import defaultImage from "../asset/icon/cabbi.png";

// 프로필 이미지 가져오기
export const fetchProfileImage = async (mno, setProfileImage, DEFAULT_IMAGE = defaultImage) => {
    try {
        const isExistsProfileData = await isExistsProfileImageByMno(mno);
        if (isExistsProfileData === true) {
            const data = await getProfileImageDataByMno(mno);
            if (data.error === "NOT_EXIST_IMAGE") {
                setProfileImage(DEFAULT_IMAGE);
                return DEFAULT_IMAGE; // 기본 이미지 반환
            }

            const imageData = await getProfileImage(mno);
            if (imageData instanceof Blob) {
                const profileURL = URL.createObjectURL(imageData);
                setProfileImage(profileURL);
                return profileURL; // 생성한 URL 반환
            } else {
                throw new Error("Returned data is not a Blob.");
            }
        } else {
            setProfileImage(DEFAULT_IMAGE);
            return DEFAULT_IMAGE; // 기본 이미지 반환
        }
    } catch (error) {
        console.error("Error fetching profile image:", error.message);
        setProfileImage(DEFAULT_IMAGE);
        return DEFAULT_IMAGE; // 기본 이미지 반환
    }
};


// 썸네일 이미지 가져오기
export const fetchProfileThumbnail = async (mno, setThumbnailImage, DEFAULT_IMAGE = defaultImage) => {
    try {
        const isExistsProfileData = await isExistsProfileImageByMno(mno);
        if (isExistsProfileData === true) {
            const thumbnailData = await viewThumbnailGetByMno(mno);
            if (thumbnailData instanceof Blob) {
                const thumbnailURL = URL.createObjectURL(thumbnailData);
                setThumbnailImage(thumbnailURL);
            } else {
                throw new Error("Returned thumbnail data is not a Blob.");
            }
        } else {
            setThumbnailImage(DEFAULT_IMAGE);
        }
    } catch (error) {
        console.error("Error fetching profile thumbnail:", error.message);
        setThumbnailImage(DEFAULT_IMAGE);
    }
};

export const getProfileThumbnail = async (mno, DEFAULT_IMAGE = defaultImage) => {
    try {
        const isExistsProfileData = await isExistsProfileImageByMno(mno);
        if (isExistsProfileData === true) {
            const thumbnailData = await viewThumbnailGetByMno(mno);
            if (thumbnailData instanceof Blob) {
                const thumbnailURL = URL.createObjectURL(thumbnailData);
                return thumbnailURL;
            } else {
                throw new Error("Returned thumbnail data is not a Blob.");
            }
        } else {
            return DEFAULT_IMAGE;
        }
    } catch (error) {
        console.error("Error fetching profile thumbnail:", error.message);
        return DEFAULT_IMAGE;
    }
};