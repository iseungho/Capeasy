import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api`;

export const postVideo = async (video) => {
    const formData = new FormData();
    formData.append('fileName', video.name);
    formData.append('file', video); // 파일과 파일 이름 추가

    try {
        const res = await jwtAxios.post(`${prefix}/videos/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};

export const convertVideo = async (vno) => {
    try {
        const res = await jwtAxios.get(`${prefix}/convert/${vno}`);
        return res.data;
    } catch (error) {
        console.error('Error converting video:', error);
        throw error;
    }
};

export const getImage = async (ino) => {
    try {
        const res = await jwtAxios.get(`${prefix}/images/view/${ino}`);
        return res.data;
    } catch (error) {
        console.error('Error getting image:', error);
        throw error;
    }
};