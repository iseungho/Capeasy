import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/images`;

export const postImage = async (imageName, image) => {
    const formData = new FormData();
    formData.append('fileName', imageName);
    formData.append('file', image);

    try {
        const res = await axios.post(`${prefix}/`, formData, {
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
    const res = await axios.get(`${prefix}/${ino}`);
    return res.data;
};

export const deleteImage = async (ino) => {
    if (!ino) {
        throw new Error("Image number (ino) is required");
    }
    const res = await axios.delete(`${prefix}/${ino}`);
    return res.data;
};

export const getImage2 = async (ino) => {
    const res = await axios.get(`${prefix}/view/${ino}`);
    return res.data;
};

export const getThumbnail = async (ino) => {
    const res = `${prefix}/view/thumbnail/${ino}`;
    console.log(res);
    return res;
};
