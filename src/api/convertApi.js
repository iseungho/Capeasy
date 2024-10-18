import jwtAxios from "../util/jwtUtil";
import API_SERVER_HOST from './apiConfig'

const prefix = `${API_SERVER_HOST}/convert`;

export const convertVideo = async (vno) => {
    const res = await jwtAxios.get(`${prefix}/${vno}`);
    return res.data;

};