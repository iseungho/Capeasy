import jwtAxios from "../util/jwtUtil";
import axios from "axios";
import API_SERVER_HOST from "./apiConfig";

const prefix = `${API_SERVER_HOST}/profile/images`;

// 프로필 이미지 추가(변경)
export const postProfileImage = async (image, mno) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('mno', mno);

    try {
        const res = await jwtAxios.post(`${prefix}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("post profile image success")
        return res.data;
    } catch (error) {
        console.error('Error uploading profileimage:', error);
        throw error;
    }
};

// 프로필 이미지 정보 조회
export const getProfileImageData = async (pino) => {
    console.log("get profile image data success")
    const res = await axios.get(`${prefix}/${pino}`);
    return res.data;

};

// 회원 번호로 프로필 이미지 정보 조회
export const getProfileImageDataByMno = async (mno) => {
    console.log("get profile image data by mno success")
    const res = await axios.get(`${prefix}/member/${mno}`);
    return res.data;
};

// 프로필 이미지 번호로 불러오기
export const getProfileImage = async (pino) => {
    console.log("get profile image success")
    const res = await axios.get(`${prefix}/view/${pino}`);
    return res.data;
};

// 프로필 이미지 번호로 썸네일 불러오기
export const getThumbnailByPino = async (pino) => {
    console.log("get Thumbnail by pino success")
    const res = await axios.get(`${prefix}/view/thumbnail/${pino}`);
    return res.data;
};