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
        return res.data;
    } catch (error) {
        console.error('Error uploading profileimage:', error);
        throw error;
    }
};

// 프로필 이미지 정보 조회
export const getProfileImageData = async (pino) => {
    const res = await axios.get(`${prefix}/${pino}`);
    return res.data;

};

// 프로필 이미지 존재 여부 확인
export const isExistsProfileImageByMno = async (mno) => {
    const res = await axios.get(`${prefix}/exists/member/${mno}`);
    return res.data;
};

// 회원 번호로 프로필 이미지 정보 조회
export const getProfileImageDataByMno = async (mno) => {
    if (!mno) {
        console.log("Invalid mno: Skipping profile image request.");
        return null;
    }

    try {
        axios.interceptors.response.use(
            (response) => response, // 성공 시 응답 그대로 반환
            (error) => {
                if (error.response?.status === 400) {
                    console.log("400 Error suppressed: Invalid request.");
                    return Promise.resolve({ error: 'Invalid mno. No profile data.' }); // 에러를 처리한 뒤 성공으로 변환
                }
                return Promise.reject(error); // 다른 에러는 그대로 던짐
            }
        );
        const res = await axios.get(`${prefix}/member/${mno}`);
        return res.data;
    } catch (error) {
        if (error.response?.status === 400) {
            // 에러를 강제로 처리해도 콘솔에서 표시되지 않도록
            return { error: 'Invalid mno. No profile data found.' };
        }
        console.error('Unexpected Error:', error);
        return { error: error.response?.data || error.message };
    }
};



// 프로필 이미지 번호로 불러오기
export const getProfileImage = async (mno) => {
    try {
        const res = await axios.get(`${prefix}/view/member/${mno}`, { responseType: 'blob' });
        return res.data;
    } catch (error) {
        console.error('Error Message:', error);
        return { error: error.response ? error.response.data : error.message };
    }
};

// 프로필 이미지 번호로 썸네일 불러오기
export const getThumbnailByPino = async (mno) => {
    const res = await axios.get(`${prefix}/view/thumbnail/${mno}`);
    return res.data;
};

// 회원 번호로 프로필 이미지 삭제
export const deleteProfileImageByMno = async (mno) => {
    const res = await jwtAxios.delete(`${prefix}/member/${mno}`);
    return res.data;
};