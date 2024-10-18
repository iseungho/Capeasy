import jwtAxios from "../util/jwtUtil";
import API_SERVER_HOST from './apiConfig'

const prefix = `${API_SERVER_HOST}/videos`;

export const postVideo = async (video, uno) => {

    const formData = new FormData();
    formData.append('fileName', video.name);
    formData.append('file', video);
    formData.append('uno', uno);

    try {
        const res = await jwtAxios.post(`${prefix}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return res.data;
    } catch (error) {
        return { error: error.response ? error.response.data : error.message };
    }
};