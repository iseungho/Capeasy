import jwtAxios from "../util/jwtUtil";
import axios from "axios";
import API_SERVER_HOST from './apiConfig'

const prefix = `${API_SERVER_HOST}/images`;

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
    const res = await axios.get(`${prefix}/view/${ino}`);
    return res.data;

};

export const getThumbnail = async (ino) => {
    console.log("getThumbnail success")
    const res = await axios.get(`${prefix}/view/thumbnail/${ino}`);
    return res.data;
};
