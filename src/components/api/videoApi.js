import axios from "axios";

export const API_SERVER_HOST = 'http://52.78.93.135';
const prefix = `${API_SERVER_HOST}/api`;

export const postVideo = async (video) => {
    const formData = new FormData();
    formData.append('fileName', video.name);
    formData.append('file', video); // 파일과 파일 이름 추가

    try {
        const res = await axios.post(`${prefix}/videos/`, formData, {
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
    const res = await axios.get(`${prefix}/convert/${vno}`)
    return res.data
}

export const getImage = async (ino) => {
    const res = await axios.get(`${prefix}/images/view/${ino}`)

    return res.data
}