import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import API_SERVER_HOST from "./apiConfig";

const prefix = `${API_SERVER_HOST}/replies`;

export const postReply = async (replyData) => {
    const formData = new FormData();

    formData.append('bno', replyData.bno);
    formData.append('replierId', replyData.replierId);
    formData.append('replierEmail', replyData.replierEmail);
    formData.append('content', replyData.content);

    const res = await jwtAxios.post(`${prefix}/`, formData)

    return res.data
};

export const getReply = async (rno) => {
    const res = await axios.get(`${prefix}/${rno}`);

    return res.data
}

export const getReplyByBno = async (bno) => {
    const res = await axios.get(`${prefix}/board/${bno}`);

    return res.data
}

export const putReply = async (rno, replyData) => {
    const formData = new FormData();
    formData.append('content', replyData.content);
    formData.append('replierId', replyData.replierId);
    formData.append('replierEmail', replyData.replierEmail);

    const res = await jwtAxios.put(`${prefix}/${rno}`, formData);

    return res.data
}

export const deleteReply = async (rno) => {
    const res = await jwtAxios.delete(`${prefix}/${rno}`);

    return res.data
}