import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api`;

export const postVideo = async (video, uno) => {

    const formData = new FormData();
    formData.append('fileName', video.name);
    formData.append('file', video);
    formData.append('uno', uno);

    try {
        const res = await jwtAxios.post(`${prefix}/videos/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return res.data;
    } catch (error) {
        return { error: error.response ? error.response.data : error.message };
    }
};

export const convertVideo = async (vno) => {
    const res = await jwtAxios.get(`${prefix}/convert/${vno}`);
    return res.data;

};

export const getImage = async (ino) => {
    const res = await jwtAxios.get(`${prefix}/images/view/${ino}`);
    return res.data;

};