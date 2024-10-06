import jwtAxios from "../util/jwtUtil";
import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api`;

export const postImage = async (image, uno) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('uno', uno);

    try {
        const res = await jwtAxios.post(`${prefix}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const getImage = async (ino) => {
    const res = await axios.get(`${prefix}/images/view/${ino}`);
    return res.data;

};

export const getThumbnail = async (ino) => {
    console.log("getThumbnail success")
    const res = await axios.get(`${prefix}/images/view/thumbnail/${ino}`);
    return res.data;
};
