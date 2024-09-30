import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/replies`;

export const postReply = async (replyData) => {
    const formData = new FormData();

    formData.append('bno', replyData.bno);
    formData.append('replierId', replyData.replierId);
    formData.append('content', replyData.content);

    const res = await jwtAxios.post(`${prefix}/`, formData)

    return res.data
};

export const getReply = async (rno) => {
    const res = await jwtAxios.get(`${prefix}/${rno}`);

    return res.data
}

export const getReplyByBno = async (bno) => {
    const res = await jwtAxios.get(`${prefix}/board/${bno}`);

    return res.data
}

export const putReply = async (rno) => {
    const res = await jwtAxios.put(`${prefix}/${rno}`);

    return res.data
}

export const deleteReply = async (rno) => {
    const res = await jwtAxios.delete(`${prefix}/${rno}`);

    return res.data
}