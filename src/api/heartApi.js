import jwtAxios from "../util/jwtUtil";
import axios from "axios";
import API_SERVER_HOST from "./apiConfig";

const prefix = `${API_SERVER_HOST}/hearts`;

export const postHeart = async (heartData) => {
    const formData = new FormData();
    formData.append('bno', heartData.bno);
    formData.append('memberId', heartData.memberId);
    formData.append('memberEmail', heartData.memberEmail);


    try {
        const res = await jwtAxios.post(`${prefix}/`, formData, {
        });
        return res.data;
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};


export const getHeart = async (hno) => {
    const res = await axios.get();

    return res.data;
}

export const getHeartListByBno = async (bno) => {
    if(!bno) {
        throw new Error("Board number (bno) is required");
    }
    const res = await axios.get(`${prefix}/board/${bno}`);
    return res.data
}

export const deleteHeart = async (hno) => {
    if (!hno) {
        throw new Error("Heart number (hno) is required");
    }
    const res = await jwtAxios.delete(`${prefix}/${hno}`);
    return res.data;
}

export const findHnoByMnoBno = async (mno, bno) => {
    try {
        const heartList = await getHeartListByBno(bno);
        
        if (Array.isArray(heartList)) {
            for (const h of heartList) {
                if (h.memberId === mno) { 
                    return h.hno;
                }
            }
        }

        return null;
    } catch (error) {
        console.error("Error finding HNO by MNO and BNO:", error);
        throw error; 
    }
}
